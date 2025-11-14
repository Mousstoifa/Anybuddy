shell:
	docker compose run --rm shell shell_plus --ptpython

aws-login:
	rm -rf .aws
	aws sso login
	cp -aL ~/.aws/. .aws/

# Login Docker to ECR so `docker compose push` can authenticate
ecr-login:
	aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 770688009346.dkr.ecr.eu-west-3.amazonaws.com

# Build and push only the backend service image to ECR
push-backend:
	docker compose -f docker-compose.prod.yaml build backend
	docker compose -f docker-compose.prod.yaml push backend

pytest:
	docker compose run --rm backend pytest -v --cov=src --cov-report=term-missing --cov-report=html
