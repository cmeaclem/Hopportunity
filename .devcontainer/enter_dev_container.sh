#!/bin/bash

# Script to build and enter the dev container using Docker CLI
docker build -t react-native-dev-container .devcontainer && \
docker run -it --rm \
  react-native-dev-container
