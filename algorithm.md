# JumpDetector Algorithm

The `JumpDetector` class is designed to detect jumps using accelerometer data. Below is a detailed description of the algorithm used in the `JumpDetector` class.

## Initialization

The `JumpDetector` class initializes several constants and variables:

- **Constants:**

  - `GRAVITY`: Acceleration due to gravity (9.81 m/s²).
  - `ALPHA`: Low-pass filter coefficient for gravity estimation (0.9).
  - `A_MIN`: Minimum acceleration threshold for take-off detection (7.0 m/s²).
  - `A_MAX`: Maximum acceleration threshold for landing detection (12.0 m/s²).

- **Variables:**
  - `g_i`: Gravity vector initialized to [0, 0, 0].
  - `previousState`: Tracks the state of the detector, initialized to 'grounded'.
  - `t_takeoff_s` and `t_landing_s`: Timestamps for take-off and landing.
  - `v_horizontal_m` and `s_horizontal_m`: Horizontal velocity and displacement vectors.

## Method

This method processes the latest accelerometer data point to detect jumps and calculate jump metrics.

### Steps:

1. **Total Acceleration Magnitude:**
   Calculate the total acceleration magnitude (`a_total_i`), as the magnitude of the linear acceleration vector.

2. **Jump Detection Logic:**

   - **Take-off Detection:**

     - If the magnitude (`a_total_i`) is less than the minimum threashold (`A_MIN`) and the previous state is 'grounded', a take-off is detected.

   - **Landing Detection:**
     - If the magnitude is greater than the landing threashold (`A_MAX`) and the previous state is 'airborne', a landing is detected.
     - Calculate jump parameters: duration, vertical displacement, and horizontal displacement.
   - **During Flight:**
     - Update horizontal velocity and displacement.

3. **Store Previous Data:**
   - Store the current data as previous data for the next iteration.

## Measurements:

- Duration

  Time between take-off and landing.

- Vertical Displacement

      Calculated using the formula: `s = (g * t²) / 8`
      - Derivation:
          -  The total flight time (`T`) is the sum of the ascent and descent times:
              `T = t_up + t_down`
          - For symmetrical motion (take-off and landing at the same height): `t_up = t_down = T/2`

          - Calculate Initial Vertical Velocity from the kinematics
              - `v = v0 - g * t`
              - `v_0 = g * T/2`
          - At the maximum height, the vertical velocity is zero:
              - `v = v0 - g * t = 0`
              - `v0 = g * T/2`
          - So `v0 = g * T/2`
          - Using the kinematic equation for displacement during ascent:
              - `s = v0 * t - 1/2 * g * t²`
              - Substitute `v0 = g * T/2` and `t = T/2`
                  - `s = g * T/2 * T/2 - 1/2 * g * T/2 * T/2`
              - Simplify:
                  - `s = g * T²/4 - g * T²/8`
                  - `s = g * T²/8`
      - Where `g` is the acceleration due to gravity and `T` is the duration of the jump.

  ​

- Horizontal Displacement

  Integrated horizontal acceleration during flight.
  Since, trivially:

  - d = ∫v dt
  - v = ∫a dt
  - d = ∫∫a dt², the double integral of acceleration with respect to time.
