output "security_group_id" {
  value = aws_security_group.apprunner_sg.id
}

output "apprunner_service_role_arn" {
  value = aws_iam_role.apprunner_instance_role.arn
}

output "apprunner_service_url" {
  value = aws_apprunner_service.trophenix.service_url
}
