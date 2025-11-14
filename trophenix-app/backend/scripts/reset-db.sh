docker compose down
docker volume rm trophenix_database-volume
docker compose up -d database
sleep 1
docker compose run --rm shell migrate
docker compose run --rm shell loaddata $(find ./src -type f -name '*.json')
docker compose run --rm shell collectstatic --no-input
docker compose up -d
