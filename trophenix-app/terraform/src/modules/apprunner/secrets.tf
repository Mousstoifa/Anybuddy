resource "aws_secretsmanager_secret" "django_secret" {
  name = "trophenix/django_secret_key"
}

resource "aws_secretsmanager_secret_version" "django_secret_version" {
  secret_id     = aws_secretsmanager_secret.django_secret.id
  secret_string = var.django_secret_key
}

resource "aws_secretsmanager_secret" "rds_password" {
  name = "trophenix/rds_password"
}

resource "aws_secretsmanager_secret_version" "rds_password_version" {
  secret_id     = aws_secretsmanager_secret.rds_password.id
  secret_string = var.rds_password
}
