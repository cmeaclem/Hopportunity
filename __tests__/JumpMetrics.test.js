import { describe, expect, it } from '@jest/globals';
import { JumpMetrics } from '../components/JumpMetrics';

describe('JumpMetrics', () => {
  it('should initialize with default values', () => {
    const metrics = new JumpMetrics();
    expect(metrics.jumpCount).toBe(0);
    expect(metrics.duration_s).toBe(0.0);
    expect(metrics.verticalDisplacement_m).toBe(0.0);
    expect(metrics.horizontalDisplacement_m).toBe(0.0);
  });

  it('should add a jump and update metrics', () => {
    const metrics = new JumpMetrics();
    metrics.addJump(1.5, 2.0, 0.8);
    expect(metrics.jumpCount).toBe(1);
    expect(metrics.duration_s).toBe(0.8);
    expect(metrics.verticalDisplacement_m).toBe(1.5);
    expect(metrics.horizontalDisplacement_m).toBe(2.0);
  });
});
