# Hopportunity

NB: All instructions in this README assume Linux (specifically Ubuntu 22.04).

## Background

I chose React Native over Flutter for this project due to its flexibility in development and ease of testing on iOS devices.
With React Native, I can leverage Expo Go, which simplifies testing on devices without the need for building and deploying an entire build each time.
Additionally, I only have Android devices in my household, which makes it more convenient to test using React Native's robust Android tooling.
React Native also provides me with an opportunity to learn more about React, which is a valuable framework for both mobile and web development.

More about the algorithm used to detect jumps can be found [here](./algorithm.md)

### Variations from the specifications

I made the following variations from the provided specifications:

> displays the duration of the last performed jump.

Additionally I added:
* A horizontal displacement metric

   This allows the user to see how far they have moved horizontally during the jump.
   This can be useful is two cases:
   1. When the user is performing "standing jumps", this field provides feedback on to coach on undesired lateral movement.
   2. When the user is performing "broad jumps", this field provides feedback on the distance covered.

* A jump height metric

   This metric is useful for the user to track their progress in jump height over time. For example, a user may want to see how their jump height changes over time as they improve their strength and technique (e.g. Basketball, Volleyball, ...).


> a start button press **resetting** the displayed count and duration values.
Additionally, I added a Stop button to stop the jump detection and keep the results from the previous session on the screen.
This allows the user to review their results after a session without losing them, or cause false positives in the jump detection algorithm.


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

### Tools

A Makefile is provided to simplify common development tasks.
From the CLI run `make help` to see a list of available targets.

## Deploying

Supported targets:

- Android (Physical and Emulated)
- iOS

For Android and iOS, first install [Expo Go](https://expo.dev/go) on your target device.
NB: For Android, my preference is to install the APK directly by downloading from the above link then `adb install <app>.apk`

NB: First builds will be slower whilst the buildtools (Gradle et al) are setup and the cache is built.

### Android

First **Connect an Android Device** (or use an emulator):

- Make sure **USB Debugging** is enabled on your Android device.
- Connect your Android device to your computer via USB.
- If using an emulator, start it from the host machine (the DevContainer can reach it).
- Make sure that you've installed Expo Go on your device.

Then run `make run` to run using Expo.
When prompted, press `a` to deploy to an Android device.

A `make run-dev` target is also provided to extend developer functionality.

Finally, you can build and deploy the full production with: `make deploy`.
This will build the APK and deploy it to the connected device.
When promted, press `a` to deploy to an Android device, or cancel to build the APK only without running.
If you want the raw APK to install directly, it will be located at `android/app/build/outputs/apk/release/app-release.apk`.

**Troubleshooting:**

- Can't connect to the physical device? Check:
  - Visible in `adb devices`?
  - Phone to Developer Mode
  - `USB debugging` Setting enabled
  - `Auto Blocker` off (Samsung)
