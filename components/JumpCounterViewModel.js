import { useState, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import { JumpDetector } from './JumpDetector';
import { JumpMetrics } from './JumpMetrics';

export const useJumpCounterViewModel = () => {
  const [jumpMetrics, setJumpMetrics] = useState(new JumpMetrics());
  const [isMonitoring, setIsMonitoring] = useState(false);
  const isMonitoringRef = useRef(isMonitoring);
  let subscription;

  const startMonitoring = () => {
    if (isMonitoringRef.current) {
      console.log('Already monitoring');
      return;
    }

    const jumpDetector = new JumpDetector();
    isMonitoringRef.current = true;
    setIsMonitoring(true);

    console.log('Start monitoring');

    Accelerometer.setUpdateInterval(10);
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (!isMonitoringRef.current) return;
    
      timestamp_s = Date.now() / 1000;
      console.log(`Accelerometer data - t: ${timestamp_s}, x: ${x}, y: ${y}, z: ${z}`);
      jumpDetector.pushSensorData({ timestamp_s, x, y, z });

      // Update UI with the latest jump metrics
      setJumpMetrics(jumpDetector.getJumpMetrics());
    });
  };

  const stopMonitoring = () => {
    if (subscription) {
      subscription.remove();
      subscription = null;
    }
    // Remove all listeners, just to be safe
    Accelerometer.removeAllListeners();
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