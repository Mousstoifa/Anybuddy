# Trophenix Terraform

## Overview

This repository contains Terraform configurations for deploying and managing the Trophenix application infrastructure on AWS. It includes modules for setting up S3 buckets, App Runner services, and other necessary resources.

## Connect to the database using AWS SSM

Make sure you have the necessary permissions and AWS CLI configured to use SSM. You must first install the SSM extention for the AWS CLI.

To connect to the PostgreSQL database using AWS Systems Manager (SSM), you can use the following command:

```bash
cd src
./connect_db.sh
```

## Make a change

1. copy `terraform.tfvars.example` to `terraform.tfvars` and update the values
1. review changes with `terraform plan`
1. apply changes with `terraform apply`

## First deploy

1. Login to AWS `aws sso login`
1. Initialize Terraform `cd src && terraform init`
1. Deploy the ECR Registry:

```sh
cd src/ecr
terraform plan -target=module.ecr -out ecr.plan
terraform apply ecr.plan
```

4. Push the Docker image to ECR
1. Deploy the rest of the infrastructure:

```sh
cd src
terraform apply
```
