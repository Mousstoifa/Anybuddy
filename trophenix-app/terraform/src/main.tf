terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

// Load S3 bucket definitions from subfolder
module "s3" {
  source           = "./modules/s3"
  backend_role_arn = module.apprunner.apprunner_service_role_arn
  admin_role_arn   = var.admin_role_arn
}


module "ecr" {
  source = "./modules/ecr"
}

module "rds" {
  source                      = "./modules/rds"
  vpc_id                      = aws_vpc.main.id
  apprunner_security_group_id = module.apprunner.security_group_id
  db_password                 = var.db_password
  db_username                 = var.db_username
  db_name                     = var.db_name
}

module "apprunner" {
  source                = "./modules/apprunner"
  vpc_id                = aws_vpc.main.id
  database_subnet_ids   = module.rds.private_subnet_ids
  rds_endpoint          = split(":", module.rds.rds_endpoint)[0]
  rds_password          = var.db_password
  rds_username          = var.db_username
  rds_db_name           = var.db_name
  docker_image          = "${module.ecr.repository_url}:latest"
  django_secret_key     = var.django_secret_key
  s3_bucket_name        = module.s3.app_primary_bucket_name
  s3_static_bucket_name = module.s3.static_bucket_name
}
