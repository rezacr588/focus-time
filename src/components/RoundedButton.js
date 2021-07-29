import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      border: '1px solid #fff',
      justifyContent: 'center',
    },
    text: { color: '#fff', fontSize: size / 4},
  });
