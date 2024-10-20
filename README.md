# Hopportunity

NB: All instructions in this README assume Linux (specifically Ubuntu 22.04).

## Background

I chose React Native over Flutter for this project due to its flexibility in development and ease of testing on iOS devices.
With React Native, I can leverage Expo Go, which simplifies testing on physical iPhones without the need for building and deploying an entire iOS build each time.
Additionally, I only have Android devices in my household, which makes it more convenient to test using React Native's robust Android tooling.
React Native also provides me with an opportunity to learn React, which is a valuable framework for both mobile and web development.

## Developing

**Conventions:**
- Units, unless otherwise specified, are SI units.

**Requirements:**
- Docker installed on your machine.
- [Recomended] VSCode


### Environment
A `devcontainer` is used to define and control the Development Environment, making it hermetic and portable across developer machines.
The container includes everything you need to get started, including the Android SDK, Node.js, and Expo CLI.

**Use VSCode** to build and run the container.

If you prefer not to use VSCode, you can instead entering the Dev Container from the Command Line:

1. Build and Enter the Dev Container
   - Run the following script from the root directory of the project:
     ```sh
     make enter-container
     ```
   This target will build the dev container and start an interactive terminal session.

2. Inside the Container
   - Once inside the container, you can start developing using `npm`, `expo`, or `react-native` commands.


## Deploying

Supported targets:
* Android (Physical and Emulated)
* iOS

For Android and iOS, first install [Expo Go](https://expo.dev/go) on your target device.
NB: For Android, my preference is to install the APK directly by downloading from the above link then `adb install <app>.apk`

All targets can be deployed to by running: `make run`.
A `make run-dev` target is also provided to extend developer functionality.

### Android

First **Connect an Android Device** (or use an emulator):
   - Make sure **USB Debugging** is enabled on your Android device.
   - Connect your Android device to your computer via USB.
   - If using an emulator, start it.

**Troubleshooting:**

* Can't connect to the physical device? Check:
  * Visible in `adb devices`?
  * Phone to Developer Mode
  * `USB debugging` Setting enabled
  * `Auto Blocker` off (Samsung)
