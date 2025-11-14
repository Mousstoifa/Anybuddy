output "static_bucket_url" {
  value       = module.s3.static_bucket
  description = "Static bucket url"
}

output "app_bucket_url" {
  value       = module.s3.app_primary_bucket
  description = "Primary app bucket url"
}
output "docker_registry_url" {
  value       = module.ecr.repository_url
  description = "URL of the docker registry, hosted on AWS ECR"
}

output "backend_url" {
  value       = module.apprunner.apprunner_service_url
  description = "Public URL of the backend, hosted on AWS App Runner"
}

output "rds_endpoint" {
  description = "RDS instance endpoint"
  value       = module.rds.rds_endpoint
}

output "bastion_instance_id" {
  description = "The instance ID of the bastion host"
  value       = module.rds.bastion_instance_id
}
