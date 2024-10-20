import { JumpMetrics } from './JumpMetrics';

export class JumpDetector {
  constructor() {
    this.jumpMetrics = new JumpMetrics();

    // Constants
    this.GRAVITY = 9.81; // Acceleration due to gravity (m/s²)
    this.ALPHA = 0.9; // Low-pass filter coefficient for gravity estimation
    this.A_MIN = 7.0; // Minimum acceleration threshold for take-off detection (m/s²)
    this.A_MAX = 12.0; // Maximum acceleration threshold for landing detection (m/s²)

    // Initialize variables
    this.g_i = [0, 0, 0]; // Gravity vector
    this.previousState = 'grounded';
    this.t_takeoff_s = null;
    this.t_landing_s = null;
    this.v_horizontal_m = [0, 0]; // Horizontal velocity vector
    this.s_horizontal_m = [0, 0]; // Horizontal displacement vector
  }

  /**
   * Adds new sensor data and processes it for jump detection.
   * Acceleration data from system is in g's (1 g = 9.81 m/s²).
   * @param {Object} data - The accelerometer data point { x, y, z, timestamp_s }.
   */
  pushSensorData(data) {
    // Convert to internal SI units (m/s²)
    data.x *= this.GRAVITY;
    data.y *= this.GRAVITY;
    data.z *= this.GRAVITY;
    this._detectJump(data);
  }

  /**
   * Processes the latest accelerometer data point to detect jumps and calculate jump metrics.
   * Acceleration data is m/s².
   * @param {Object} data - The accelerometer data point { x, y, z, timestamp_s }.
   */
  _detectJump(data) {
    const t_i_s = data.timestamp_s;

    let delta_t_s;
    if (this.previousData) {
      delta_t_s = t_i_s - this.previousData.timestamp_s;
    } else {
      delta_t_s = 0;
    }

    const { x, y, z } = data;
    const a_i = [x, y, z];

    // Gravity estimation using low-pass filter
    this.g_i = this.g_i.map(
      (g, index) => this.ALPHA * g + (1 - this.ALPHA) * a_i[index]
    );

    // Linear acceleration (subtract gravity)
    const a_i_prime = a_i.map((a, index) => a - this.g_i[index]);

    // Total acceleration magnitude (including gravity)
    const a_total_i = Math.sqrt(a_i[0] ** 2 + a_i[1] ** 2 + a_i[2] ** 2);

    // For debugging: Log the total acceleration
    console.log(`Total Acceleration: ${a_total_i.toFixed(2)} m/s²`);

    // Jump detection logic
    if (a_total_i < this.A_MIN && this.previousState === 'grounded') {
      // Take-off detected
      console.log('Take-off detected');
      this.t_takeoff_s = t_i_s;
      this.previousState = 'airborne';

      // Reset horizontal velocity and displacement
      this.v_horizontal_m = [0, 0];
      this.s_horizontal_m = [0, 0];
    } else if (a_total_i > this.A_MAX && this.previousState === 'airborne') {
      // Landing detected
      console.log('Landing detected');
      this.t_landing_s = t_i_s;
      this.previousState = 'grounded';

      // Calculate jump parameters
      const duration_s = this.t_landing_s - this.t_takeoff_s;
      const verticalDisplacement_m = (this.GRAVITY * duration_s ** 2) / 8;
      const horizontalDisplacement_m = Math.sqrt(
        this.s_horizontal_m[0] ** 2 + this.s_horizontal_m[1] ** 2
      );

      // Store the results in jumpMetrics
      this.jumpMetrics.addJump(
        verticalDisplacement_m,
        horizontalDisplacement_m,
        duration_s
      );

      // Reset for the next jump detection
      this.t_takeoff_s = null;
      this.t_landing_s = null;
      this.s_horizontal_m = [0, 0];
      this.v_horizontal_m = [0, 0];
    } else if (this.previousState === 'airborne') {
      // Update horizontal velocity and displacement during flight
      for (let j = 0; j < 2; j++) {
        this.v_horizontal_m[j] += a_i_prime[j] * delta_t_s;
        this.s_horizontal_m[j] += this.v_horizontal_m[j] * delta_t_s;
      }
    }

    // Store the current data as previous data for the next iteration
    this.previousData = data;
  }

  /**
   * Returns the calculated jump metrics.
   * @returns {JumpMetrics} An object containing jump metrics.
   */
  getJumpMetrics() {
    return this.jumpMetrics;
  }
}
