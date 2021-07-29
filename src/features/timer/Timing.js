import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChange }) => {
  return (
    <View style={styles.TimeWrapper}>
      <RoundedButton size={80} title="10" onPress={() => onChange(10)} />
      <RoundedButton size={80} title="15" onPress={() => onChange(15)} />
      <RoundedButton size={80} title="20" onPress={() => onChange(20)} />
    </View>
  );
};

const styles = StyleSheet.create({
  TimeWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
