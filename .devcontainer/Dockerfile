FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:22

# Install additional dependencies for Android
RUN apt-get update && \
    apt-get install -y android-sdk adb && \
    npm install -g react-native-cli expo-cli && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install React and Expo
RUN npm install -g react-native-cli expo-cli

# Setup environment variables for Android SDK
ARG SDK_VERSION=commandlinetools-linux-6609375_latest.zip
ARG ANDROID_BUILD_VERSION=28
ARG ANDROID_TOOLS_VERSION=28.0.3
ENV ANDROID_HOME=/opt/android
ENV ANDROID_SDK_HOME=${ANDROID_HOME}

ENV PATH=${ANDROID_HOME}/cmdline-tools/tools/bin:${ANDROID_HOME}/emulator:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:/opt/buck/bin/:${PATH}

RUN apt update -qq && apt install -qq -y --no-install-recommends openjdk-17-jdk \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.google.com/android/repository/${SDK_VERSION} -o /tmp/sdk.zip \
    && mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && unzip -q -d ${ANDROID_HOME}/cmdline-tools /tmp/sdk.zip \
    && rm /tmp/sdk.zip \
    && yes | sdkmanager --licenses \
    && yes | sdkmanager "platform-tools" \
        "emulator" \
        "platforms;android-$ANDROID_BUILD_VERSION" \
        "build-tools;$ANDROID_TOOLS_VERSION" \
        "system-images;android-21;google_apis;armeabi-v7a"

# Set ANDROID_HOME accessible to all
RUN chmod -R 777 ${ANDROID_HOME}
