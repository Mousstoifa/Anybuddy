# Trophenix Backend

This README explains how to run the Trophenix backend locally using Docker Compose and how to provide AWS credentials so the app can access S3 buckets (used in non-development environments).

## Prerequisites

- Git
- Docker & Docker Compose
- make (optional, recommended)
- [Optional] AWS CLI v2 (to authenticate to AWS via SSO or manage ECR)

## Quick start — run locally with Docker

1. Copy or create a `.env` file in the project root with the minimum required variables. Example `.env.example` provided:

```sh
cp .env.example .env
```

1. Apply migrations and create test data:

```bash
./scripts/reset-db.sh
```

You will have two users available for login:
- Admin user: `admin@test.fr / password: trophenix`
- Regular user: `trophenix@test.fr / password: trophenix`

2. Start services:

```bash
docker compose up --build
```

1. (Optional) Use the Django shell_plus helper via the provided Makefile target:

```bash
make shell
```

The backend will be available at http://localhost:8000 by default. You will be able to see the swagger. Go watch the video showing how to authenticate and make requests from Swagger UI (you must watch the video on your local machine to access the video file):
[./imgs/authenticate-swagger.mp4](./imgs/authenticate-swagger.mp4)

## [Optional] AWS authentication (S3 buckets / ECR)

The project uses local files for storage in development (see `_conf/settings.py`). In production (when `ENVIRONMENT != development`) the app uses S3 via `django-storages` and the `AWS_STORAGE_BUCKET_NAME` settings.

To connect to AWS, use AWS SSO. Other solututions are possible but not documented here.

### AWS SSO (recommended for teams)

	- Install and configure the AWS CLI v2 with SSO for your account/organization.
	- Add to your .env the lines `AWS_PROFILE="trophenix"` and `AWS_S3_SESSION_PROFILE="trophenix"` (or your profile name).
	- Run the Makefile helper which will run `aws sso login` and copy your local `~/.aws` config/credentials into the repository `.aws/` folder (the compose file mounts `.aws` into containers):

	```bash
	make aws-login
	```

	- After this, the mounted `.aws` will contain the SSO credentials and AWS calls from inside the container will pick them up.


Notes:
- The Compose file mounts `./.aws` into `/root/.aws` in the container. If you prefer to use env variables instead, ensure they are added to the `.env` used by Compose.


## Deploy a change

### Pushing a new backend image to ECR

To push a new backend image to ECR, authenticate with AWS and use the provided Makefile targets:

```bash
# login to ECR (uses aws cli)
make ecr-login

# build and push the backend image to ECR
make push-backend
```

### Applying migrations

To apply migrations on the production database, go to the terraform repository and start a SSM session to the bastion host. Update the `DB_HOST` in your `.env` to point to `host.docker.internal` (the bastion host will forward connections to the RDS instance).

Then run:

```bash
docker compose run --rm shell migrate
```

### Reloading the AppRunner service

Make sure that the AppRunner service has reloaded at https://eu-west-3.console.aws.amazon.com/apprunner. If not, you can force a redeploy from the console.

### Updating static files in S3

To update static files in the S3 bucket, configure SSO auth in the docker image with sufficient permissions to write to the S3 bucket, then run:

```bash
docker compose run --rm shell collectstatic --noinput
```

## Running tests

To run tests, set `ENVIRONMENT=production` in your `.env` file, then run:

```sh
 docker compose run --rm backend pytest  
```

## Generating TypeScript types from the OpenAPI schema
To generate TypeScript types from the OpenAPI schema, ensure the backend is running and that you have [bun](https://bun.sh) installed, then run:

```sh
 cd generate-ts
 bun install
 bunx openapi-typescript http://localhost:8000/api/v1/schema/?format=yaml&lang=en -o ./generated/trophenix.d.ts
```

for more information on how to use the generated types, see OpenAPI-TS [documentation](https://openapi-ts.dev) and OpenAPI-FETCH [documentation](https://openapi-ts.dev/openapi-fetch/)


## Notes & troubleshooting

- If you change Python dependencies, the `Dockerfile` uses `uv`/`uv.lock` to install pinned deps. Rebuild containers after edits.
- Containers mount `./src` into `/app/src` for rapid development; if you add new files, the container will see them immediately.
- If the DB fails to accept connections on first run, wait a few seconds and re-run the migrate command; using `depends_on` does not guarantee full DB readiness.
