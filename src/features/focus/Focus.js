import React, { useState } from 'react';
import { Text, Platform, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { theme } from '../../utils/theme';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
            style={styles.input}
          />
          <RoundedButton
            onPress={() => {
              addSubject(subject);
            }}
            title="+"
            size={50}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.xl,
  },
  innerContainer: {
    flex: 0.75,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.md,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
});
