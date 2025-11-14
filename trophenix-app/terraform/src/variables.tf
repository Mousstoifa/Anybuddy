variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-3"
}

variable "db_name" {
  description = "Name of the RDS database"
  type        = string
  default     = "trophenix"
}

variable "db_username" {
  description = "Username for the RDS database"
  type        = string
  default     = "trophenix"
}

variable "db_password" {
  description = "Password for the RDS database"
  type        = string
  sensitive   = true
}

variable "django_secret_key" {
  description = "Secret key for the Django application"
  type        = string
  sensitive   = true
}

variable "admin_role_arn" {
  description = "IAM Role ARN of the admin user that can manage S3 bucket"
  type        = string
}
