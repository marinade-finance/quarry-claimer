#!/bin/bash

SCRIPT_DIR=$(dirname "$0")
IMAGE_TAG="public.ecr.aws/n0y9d4d4/marinade.finance/liquidity-minining-quarry-claimer:latest"

docker build -f "$SCRIPT_DIR/../Dockerfile" -t "$IMAGE_TAG" "$SCRIPT_DIR/.."
