
variable "subnet_id" {
  description = "The subnet ID to launch the bastion host in."
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID where the bastion host will be deployed"
  type        = string
}
