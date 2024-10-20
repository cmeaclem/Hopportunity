export class JumpMetrics {
    constructor(jumpCount = 0, duration_ms = 0.0, verticalDisplacement_m = 0.0, horizontalDisplacement_m = 0.0) {
        this.jumpCount = jumpCount;
        this.duration_ms = duration_ms;
        this.verticalDisplacement_m = verticalDisplacement_m;
        this.horizontalDisplacement_m = horizontalDisplacement_m;
    }

    addJump(verticalDisplacement_m, horizontalDisplacement_m, duration_ms) {
        this.jumpCount += 1;
        // Metrics
        this.duration_ms = duration_ms;
        this.verticalDisplacement_m = verticalDisplacement_m;
        this.horizontalDisplacement_m = horizontalDisplacement_m;
    }
}
