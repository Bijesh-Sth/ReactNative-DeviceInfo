import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

type Props = {
  message?: string;
};

const LoadingView = ({message = 'Loading...'}: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      {message ? <Text style={styles.text}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default LoadingView;
