data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "django_backend_assume" {
  statement {
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "django_backend" {
  name               = "DjangoBackendRole"
  assume_role_policy = data.aws_iam_policy_document.django_backend_assume.json
  description        = "Backend role with access to app & static S3 buckets"
}
