output "bucket_name" {
  value       = aws_s3_bucket.app.bucket
  description = "Bucket name"
}

output "bucket_arn" {
  value       = aws_s3_bucket.app.arn
  description = "Bucket ARN"
}

output "bucket_url" {
  value       = aws_s3_bucket.app.bucket_regional_domain_name
  description = "Bucket URL"
}
