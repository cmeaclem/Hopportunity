import { useState, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import { JumpDetector } from './JumpDetector';
import { JumpMetrics } from './JumpMetrics';

/**
 * Custom hook to manage jump counting and monitoring.
 * @returns {Object} - The jump metrics, monitoring state, and control functions.
 */
export const useJumpCounterViewModel = () => {
  const [jumpMetrics, setJumpMetrics] = useState(new JumpMetrics());
  const [isMonitoring, setIsMonitoring] = useState(false);
  const isMonitoringRef = useRef(isMonitoring);
  let subscription;

  /**
   * Starts monitoring accelerometer data for jump detection.
   */
  const startMonitoring = () => {
    if (isMonitoringRef.current) {
      console.debug('Already monitoring');
      return;
    }

    const jumpDetector = new JumpDetector();
    isMonitoringRef.current = true;
    setIsMonitoring(true);

    Accelerometer.setUpdateInterval(10);
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (!isMonitoringRef.current) return;

      let timestamp_s = Date.now() / 1000;
      console.debug(
        `Accelerometer data - t: ${timestamp_s}, x: ${x}, y: ${y}, z: ${z}`
      );
      jumpDetector.pushSensorData({ timestamp_s, x, y, z });

      // Update UI with the latest jump metrics
      setJumpMetrics(jumpDetector.getJumpMetrics());
    });
  };

  /**
   * Stops monitoring accelerometer data.
   */
  const stopMonitoring = () => {
    if (subscription) {
      subscription.remove();
    }
    isMonitoringRef.current = false;
    setIsMonitoring(false);
  };

  return {
    jumpMetrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
  };
};
