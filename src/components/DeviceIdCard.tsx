import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  deviceId?: string;
};

const DeviceIdCard = ({deviceId}: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Device ID:</Text>
      <Text style={styles.value}>{deviceId || 'Not available'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
});

export default DeviceIdCard;
