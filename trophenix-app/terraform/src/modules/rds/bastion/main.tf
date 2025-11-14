resource "aws_security_group" "bastion_sg" {
  #checkov:skip=CKV2_AWS_5:SG is used in VPC Endpoint and will be used by EC2 but not in this module
  name        = "vpc-bastion-host-security-group"
  description = "Security group for bastion host"
  vpc_id      = var.vpc_id
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    description      = "Allow traffic on all ports and ip ranges"
  }
  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
    description      = "Allow traffic on all ports and ip ranges"
  }
}

resource "aws_instance" "bastion_host_ec2_instance" {
  ami                     = data.aws_ami.amazon-linux-2.id
  instance_type           = "t3.nano"
  subnet_id               = var.subnet_id
  vpc_security_group_ids  = [aws_security_group.bastion_sg.id]
  iam_instance_profile    = aws_iam_instance_profile.bastion-host-instance-profile.name
  disable_api_termination = false

  root_block_device {
    encrypted = true
  }

  #checkov:skip=CKV_AWS_135:t3.nano have ebs_optimization enabled by default
  # https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-optimized.html
  monitoring = true

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }
}
