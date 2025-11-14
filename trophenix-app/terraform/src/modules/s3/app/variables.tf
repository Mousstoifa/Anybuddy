variable "bucket_name" {
  description = "S3 bucket name for this application instance"
  type        = string
}

variable "backend_role_arn" {
  description = "IAM Role ARN to attach the app backend policy"
  type        = string
}

variable "admin_role_arn" {
  description = "IAM Role ARN to attach the admin policy"
  type        = string
}

variable "enable_strict_permission" {
  description = "Whether to enable strict bucket permissions"
  type        = bool
  default     = false
}
