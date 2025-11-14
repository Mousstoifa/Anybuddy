variable "backend_role_arn" {
  description = "IAM Role ARN allowed write access to static bucket"
  type        = string
}

variable "admin_role_arn" {
  description = "IAM Role ARN to attach the admin policy"
  type        = string
}
