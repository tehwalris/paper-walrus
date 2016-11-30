#!/bin/sh
export DOCKER_REGISTRY=registry.walr.is:5000
export DOCKER_IMAGE_PATH=$DOCKER_REGISTRY/philippe/paper-walris
docker login -u $DOCKER_USER -p $DOCKER_PASS $DOCKER_REGISTRY
docker build -t $DOCKER_IMAGE_PATH .
docker push $DOCKER_IMAGE_PATH
