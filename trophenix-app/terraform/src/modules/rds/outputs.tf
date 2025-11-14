output "private_subnet_ids" {
  description = "List of private subnet IDs for RDS instances"
  value       = tolist(aws_db_subnet_group.rds.subnet_ids)
}

output "rds_endpoint" {
  description = "The endpoint address of the RDS instance"
  value       = aws_db_instance.trophenix_db.endpoint
}

output "bastion_security_group_id" {
  value = module.bastion.bastion_security_group_id
}

output "bastion_instance_id" {
  description = "The instance ID of the bastion host"
  value       = module.bastion.bastion_instance_id
}
