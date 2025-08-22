import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppButton from './AppButton';

type Props = {
  returnUrl: string;
  onPressReturn: () => void;
  disabled?: boolean;
};

const ReturnSection = ({
  returnUrl,
  onPressReturn,
  disabled = false,
}: Props): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Will return to:</Text>
      <Text style={styles.url} numberOfLines={2}>
        {returnUrl}
      </Text>
      <AppButton
        label="Return to Website"
        onPress={onPressReturn}
        backgroundColor="#007AFF"
        disabled={disabled}
      />
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
  url: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
});

export default ReturnSection;
