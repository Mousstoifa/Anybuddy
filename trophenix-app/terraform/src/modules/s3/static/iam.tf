data "aws_iam_policy_document" "static_policy" {
  // Public read allowed
  statement {
    sid    = "AllowPublicRead"
    effect = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static.arn}/*"]
  }

  // Backend full access
  statement {
    sid    = "AllowBackendAll"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [var.backend_role_arn, var.admin_role_arn]
    }
    actions = ["s3:*"]
    resources = [
      aws_s3_bucket.static.arn,
      "${aws_s3_bucket.static.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "static" {
  bucket = aws_s3_bucket.static.id
  policy = data.aws_iam_policy_document.static_policy.json
  depends_on = [
    aws_s3_bucket_public_access_block.static,
    aws_s3_bucket_ownership_controls.static,
  ]
}
