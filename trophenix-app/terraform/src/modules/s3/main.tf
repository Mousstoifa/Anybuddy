// Root S3 composite module orchestrating app & static submodules

module "app_primary" {
  source                   = "./app"
  bucket_name              = "trophenix-app-confidences"
  backend_role_arn         = var.backend_role_arn
  admin_role_arn           = var.admin_role_arn
  enable_strict_permission = true
}

module "app_test" {
  source                   = "./app"
  bucket_name              = "trophenix-app-confidences-test-do-not-delete"
  backend_role_arn         = var.backend_role_arn
  admin_role_arn           = var.admin_role_arn
  enable_strict_permission = false
}

module "static" {
  source           = "./static"
  backend_role_arn = var.backend_role_arn
  admin_role_arn   = var.admin_role_arn
}
