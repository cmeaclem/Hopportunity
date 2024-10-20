import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useJumpCounterViewModel } from './JumpCounterViewModel';

const JumpCounterApp = () => {
  const { jumpMetrics, isMonitoring, startMonitoring, stopMonitoring } =
    useJumpCounterViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jump Count:</Text>
      <Text style={styles.value}>{jumpMetrics.jumpCount}</Text>

      <Text style={styles.label}>Last Jump Duration (ms):</Text>
      <Text style={styles.value}>{(jumpMetrics.duration_s * 1000).toFixed(0)}</Text>

      <Text style={styles.label}>Last Jump Horizontal (m):</Text>
      <Text style={styles.value}>
        {jumpMetrics.horizontalDisplacement_m.toFixed(3)}
      </Text>

      <Text style={styles.label}>Last Jump Height (m):</Text>
      <Text style={styles.value}>
        {jumpMetrics.verticalDisplacement_m.toFixed(3)}
      </Text>

      <Button
        onPress={isMonitoring ? stopMonitoring : startMonitoring}
        title={isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
      />
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
