variable "vpc_id" {
  description = "The VPC ID where the RDS instance will be deployed"
  type        = string
}

variable "apprunner_security_group_id" {
  description = "The security group ID for App Runner to access RDS"
  type        = string
}


variable "db_password" {
  description = "Password for the RDS database"
  type        = string
  sensitive   = true
}

variable "db_username" {
  description = "Username for the RDS database"
  type        = string
  default     = "trophenix_user"
}

variable "db_name" {
  description = "Name of the RDS database"
  type        = string
  default     = "trophenix"
}
