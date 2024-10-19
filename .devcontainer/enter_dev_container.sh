#!/bin/bash

# Script to build and enter the dev container using Docker CLI
docker build -t react-native-dev-container .devcontainer && \
docker run -it --rm \
  --privileged \
  --network=host \
  --mount type=bind,source=$(pwd),target=/workspace \
  --mount type=bind,source=/dev/bus/usb,target=/dev/bus/usb \
  -e ADB_SERVER_PORT=5037 \
  react-native-dev-container
