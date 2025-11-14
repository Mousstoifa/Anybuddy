variable "vpc_id" {
  description = "The VPC ID where the App Runner service will be deployed"
  type        = string
}

variable "database_subnet_ids" {
  description = "List of subnet IDs for the App Runner VPC connector"
  type        = list(string)
}

variable "rds_endpoint" {
  description = "The endpoint address of the RDS instance"
  type        = string
}

variable "docker_image" {
  description = "The Docker image URL for the App Runner service"
  type        = string
}

variable "rds_password" {
  description = "Password for the RDS database"
  type        = string
  sensitive   = true
}

variable "rds_username" {
  description = "Username for the RDS database"
  type        = string
}

variable "rds_db_name" {
  description = "Name of the RDS database"
  type        = string
}

variable "django_secret_key" {
  description = "Secret key for the Django application"
  type        = string
  sensitive   = true
}


variable "s3_bucket_name" {
  description = "The name of the S3 bucket used by the application"
  type        = string
}

variable "s3_static_bucket_name" {
  description = "The name of the S3 bucket used for static files"
  type        = string
}
