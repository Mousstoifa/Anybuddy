output "app_primary_bucket" {
  value       = module.app_primary.bucket_url
  description = "Primary app bucket url"
}

output "app_primary_bucket_name" {
  value       = module.app_primary.bucket_name
  description = "The name of the S3 bucket used by the application"
}

output "app_test_bucket" {
  value       = module.app_test.bucket_url
  description = "Test app bucket url"
}

output "static_bucket" {
  value       = module.static.bucket_url
  description = "Static bucket url"
}

output "static_bucket_name" {
  value       = module.static.static_bucket_name
  description = "Static bucket name"
}
