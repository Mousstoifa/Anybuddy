resource "aws_apprunner_service" "trophenix" {
  service_name = "trophenix"

  source_configuration {
    image_repository {
      image_identifier      = var.docker_image
      image_repository_type = "ECR"

      image_configuration {
        port = "8000"
        runtime_environment_variables = {
          POSTGRES_USER             = var.rds_username
          POSTGRES_DB               = var.rds_db_name
          POSTGRES_HOST             = var.rds_endpoint
          DJANGO_DEBUG              = "0"
          ENVIRONMENT               = "production"
          AWS_S3_BUCKET_NAME        = var.s3_bucket_name
          AWS_S3_STATIC_BUCKET_NAME = var.s3_static_bucket_name

        }

        runtime_environment_secrets = {
          POSTGRES_PASSWORD = aws_secretsmanager_secret.rds_password.arn
          DJANGO_SECRET_KEY = aws_secretsmanager_secret.django_secret.arn
        }
      }
    }

    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_access_role.arn
    }
  }

  network_configuration {
    egress_configuration {
      egress_type       = "VPC"
      vpc_connector_arn = aws_apprunner_vpc_connector.trophenix_vpc.arn
    }
  }

  health_check_configuration {
    protocol            = "HTTP" # or "TCP"
    path                = "/health"
    interval            = 10 # seconds
    timeout             = 9  # seconds
    healthy_threshold   = 1
    unhealthy_threshold = 3
  }

  instance_configuration {
    cpu               = "512"
    memory            = "1024"
    instance_role_arn = aws_iam_role.apprunner_instance_role.arn
  }
  auto_scaling_configuration_arn = aws_apprunner_auto_scaling_configuration_version.trophenix_auto_scaling.arn
}


resource "aws_apprunner_auto_scaling_configuration_version" "trophenix_auto_scaling" {
  min_size                        = 1
  max_size                        = 5
  auto_scaling_configuration_name = "trophenix-auto-scaling"
}
