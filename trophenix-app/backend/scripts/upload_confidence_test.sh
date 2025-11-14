#!/bin/bash
# Script to upload a test audio file to a given S3 presigned URL, for development testing.

if [ -z "$1" ]; then
  echo "Usage: $0 <S3 presigned URL>"
  exit 1
fi

curl -X PUT -H 'Content-Type: audio/mpeg' --data-binary @test_data/simple-audio.mp3 "$1"
