/**
 * Data structure to store jump metrics
 */
export class JumpMetrics {
  /**
   * Creates a new JumpMetrics object.
   * @param {number} jumpCount
   * @param {number} duration_s
   * @param {number} verticalDisplacement_m
   * @param {number} horizontalDisplacement_m
   */
  constructor(
    jumpCount = 0,
    duration_s = 0.0,
    verticalDisplacement_m = 0.0,
    horizontalDisplacement_m = 0.0
  ) {
    this.jumpCount = jumpCount;
    this.duration_s = duration_s;
    this.verticalDisplacement_m = verticalDisplacement_m;
    this.horizontalDisplacement_m = horizontalDisplacement_m;
  }

  /**
   * Helper function to add jump metrics.
   * @param {number} verticalDisplacement_m
   * @param {number} horizontalDisplacement_m
   * @param {number} duration_s
   */
  addJump(verticalDisplacement_m, horizontalDisplacement_m, duration_s) {
    this.jumpCount += 1;
    // Metrics
    this.duration_s = duration_s;
    this.verticalDisplacement_m = verticalDisplacement_m;
    this.horizontalDisplacement_m = horizontalDisplacement_m;
  }
}
