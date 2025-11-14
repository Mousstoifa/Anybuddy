data "aws_iam_policy_document" "app_bucket" {
  statement {
    sid    = "AllowBackendAll"
    effect = "Allow"
    principals {
      type = "AWS"
      identifiers = [
        var.backend_role_arn,
        var.admin_role_arn,
      ]
    }
    actions = ["s3:*"]
    resources = [
      aws_s3_bucket.app.arn,
      "${aws_s3_bucket.app.arn}/*",
    ]
  }

  # Conditionally include the Deny statement
  dynamic "statement" {
    for_each = var.enable_strict_permission ? [1] : []
    content {
      sid    = "DenyAllExceptListed"
      effect = "Deny"
      principals {
        type        = "*"
        identifiers = ["*"]
      }
      actions = ["s3:*"]
      resources = [
        aws_s3_bucket.app.arn,
        "${aws_s3_bucket.app.arn}/*",
      ]
      condition {
        test     = "StringNotEquals"
        variable = "aws:PrincipalArn"
        values = [
          var.backend_role_arn,
          var.admin_role_arn,
        ]
      }
    }
  }
}

resource "aws_s3_bucket_policy" "app" {
  bucket = aws_s3_bucket.app.id
  policy = data.aws_iam_policy_document.app_bucket.json
}
