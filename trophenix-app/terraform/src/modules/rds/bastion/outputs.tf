output "bastion_security_group_id" {
  value = aws_security_group.bastion_sg.id
}

output "bastion_instance_id" {
  description = "The instance ID of the bastion host"
  value       = aws_instance.bastion_host_ec2_instance.id
}
