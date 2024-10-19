FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:22

# Install additional dependencies for Android
RUN apt-get update && \
    apt-get install -y android-sdk adb && \
    npm install -g react-native-cli expo-cli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install React and Expo
RUN npm install -g react-native-cli expo-cli

# Setup environment variables for Android SDK
ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
