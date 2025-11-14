// Firewall for App Runner
resource "aws_security_group" "apprunner_sg" {
  name        = "apprunner-sg"
  description = "Allow App Runner outbound access to RDS"
  vpc_id      = var.vpc_id

  // Allows all traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

// Connects App Runner to the VPC contaning RDS
resource "aws_apprunner_vpc_connector" "trophenix_vpc" {
  vpc_connector_name = "trophenix-vpc-connector"
  subnets            = var.database_subnet_ids
  security_groups    = [aws_security_group.apprunner_sg.id]
}
