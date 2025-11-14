#!/usr/bin/env bash
set -euo pipefail

# Reset production-like DB. CAUTION: this will remove the DB volume by default.
# To use SQL drop/recreate instead of removing the volume set DROP_VOLUME=0.

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# load environment defaults
if [ -f .env ]; then
	# shellcheck disable=SC1091
	source .env
elif [ -f .env.example ]; then
	# shellcheck disable=SC1091
	source .env.example
fi

: "${POSTGRES_USER:?POSTGRES_USER must be set}"
: "${POSTGRES_DB:?POSTGRES_DB must be set}"
: "${POSTGRES_PASSWORD:?POSTGRES_PASSWORD must be set}"

# Allow overriding port when using a local port-forward to prod DB
POSTGRES_PORT=${POSTGRES_PORT:-5432}

echo "You are about to reset the production-like database '${POSTGRES_DB}' on host '${POSTGRES_HOST:-localhost}:${POSTGRES_PORT}' as user '${POSTGRES_USER}'."
echo "This will DESTROY ALL DATA in that database and re-apply migrations and load initial data."
echo "Proceed? (y/n)"
read -r CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "Aborting."
    exit 1
fi

echo "Bringing compose services down (no-op if already down)..."
docker compose down || true

echo "Waiting for remote Postgres port-forwared to (127.0.0.1:${POSTGRES_PORT}) to be reachable..."
for i in {1..60}; do
	if PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "127.0.0.1" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d postgres -c '\q'; then
		echo "Postgres is reachable"
		break
	fi
	sleep 1
done

echo "Resetting database via psql against 127.0.0.1:${POSTGRES_PORT}..."
# Run SQL on the remote/forwarded Postgres (connect to maintenance DB 'postgres')
PGPASSWORD="${POSTGRES_PASSWORD}" psql -h "127.0.0.1" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" -d postgres -v ON_ERROR_STOP=1 <<SQL
REVOKE CONNECT ON DATABASE "${POSTGRES_DB}" FROM PUBLIC;
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${POSTGRES_DB}';
DROP DATABASE IF EXISTS "${POSTGRES_DB}";
CREATE DATABASE "${POSTGRES_DB}" OWNER "${POSTGRES_USER}";
SQL


echo "Running migrations, fixtures and collectstatic..."
docker compose run --rm shell migrate
docker compose run --rm shell loaddata $(find ./src -type f -name '*.json') || true
docker compose run --rm shell collectstatic --no-input

echo "Bringing all services up..."
docker compose up -d

echo "Reset complete."
