#!/bin/bash

# Script to connect to RDS PostgreSQL via bastion host using SSM port forwarding
# Usage: ./connect-to-rds.sh

set -e

# Get the bastion instance ID and RDS endpoint from Terraform outputs
BASTION_INSTANCE_ID=$(terraform output -raw bastion_instance_id)
RDS_ENDPOINT=$(terraform output -raw rds_endpoint | cut -d':' -f1)
LOCAL_PORT=5432
REMOTE_PORT=5432

echo "Setting up port forwarding to RDS..."
echo "Bastion Instance ID: $BASTION_INSTANCE_ID"
echo "RDS Endpoint: $RDS_ENDPOINT"
echo "Local Port: $LOCAL_PORT"

# Start SSM port forwarding session
echo "Starting SSM port forwarding session..."
echo "You can now connect to PostgreSQL on localhost:$LOCAL_PORT"
echo "Press Ctrl+C to stop the port forwarding session"

aws ssm start-session \
    --target "$BASTION_INSTANCE_ID" \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters "{\"host\":[\"$RDS_ENDPOINT\"],\"portNumber\":[\"$REMOTE_PORT\"],\"localPortNumber\":[\"$LOCAL_PORT\"]}"
