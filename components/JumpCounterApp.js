import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const JumpCounterApp = () => {
  const [jumpCount, setJumpCount] = useState(0);
  const [lastJumpDuration, setLastJumpDuration] = useState(0.0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const isMonitoringRef = useRef(isMonitoring);
  let previousZ = 0;
  let stopwatch = new Date().getTime();
  let subscription;

  const startMonitoring = () => {
    // If already monitoring, do nothing
    if (isMonitoringRef.current){
      console.log('Already monitoring');
      return;
    }
    isMonitoringRef.current = true;
    setIsMonitoring(true);  // Update state as well

    console.log('Start monitoring');
    setJumpCount(0);
    setLastJumpDuration(0.0);
    stopwatch = new Date().getTime();

    subscription = Accelerometer.addListener(({ x, y, z }) => {
      if (!isMonitoringRef.current) return;

      // Log the accelerometer values for debugging
      console.log(`Accelerometer data - x: ${x}, y: ${y}, z: ${z}`);

      if (previousZ < 0 && z > 5) {
        const currentTime = new Date().getTime();
        setJumpCount((prevJumpCount) => prevJumpCount + 1);
        setLastJumpDuration((currentTime - stopwatch) / 1000);
        stopwatch = currentTime;
      }
      previousZ = z;
    });
  };

  const stopMonitoring = () => {
    if (subscription) {
      subscription.remove();
    }
    isMonitoringRef.current = false;
    setIsMonitoring(false);  // Update state as well
  };

  const toggleMonitoring = () => {
    if (isMonitoring) {
      stopMonitoring();
    } else {
      startMonitoring();
    }
  };

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of Jumps:</Text>
      <Text style={styles.value}>{jumpCount}</Text>
      <Text style={styles.label}>Last Jump Duration (seconds):</Text>
      <Text style={styles.value}>{lastJumpDuration.toFixed(2)}</Text>
      <Button title={isMonitoring ? 'Stop' : 'Start'} onPress={toggleMonitoring} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    fontSize: 24,
    marginVertical: 10,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default JumpCounterApp;