resource "aws_db_instance" "trophenix_db" {
  identifier             = "trophenix-db"
  engine                 = "postgres"
  engine_version         = "17"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = var.db_username
  password               = var.db_password
  db_name                = var.db_name
  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  skip_final_snapshot    = true
  publicly_accessible    = false
  deletion_protection    = false
}

module "bastion" {
  source    = "./bastion"
  subnet_id = aws_subnet.private_1.id
  vpc_id    = var.vpc_id
}
