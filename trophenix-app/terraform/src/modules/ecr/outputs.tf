output "repository_url" {
  description = "Repository URL (account.dkr.ecr.region.amazonaws.com/name)"
  value       = aws_ecr_repository.this.repository_url
}
