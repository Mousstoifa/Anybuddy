variable "backend_role_arn" {
  description = "IAM Role ARN allowed write access to app and static buckets"
  type        = string
}

variable "admin_role_arn" {
  description = "IAM Role ARN allowed admin access to the bucket"
  type        = string
}
