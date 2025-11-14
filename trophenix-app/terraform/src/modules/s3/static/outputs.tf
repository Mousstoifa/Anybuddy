output "bucket_name" {
  value       = aws_s3_bucket.static.bucket
  description = "Bucket name"
}

output "static_bucket_name" {
  value       = aws_s3_bucket.static.bucket
  description = "Static bucket name"
}

output "bucket_arn" {
  value       = aws_s3_bucket.static.arn
  description = "Bucket ARN"
}

output "bucket_url" {
  value       = aws_s3_bucket.static.bucket_regional_domain_name
  description = "Bucket URL"
}
