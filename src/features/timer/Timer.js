import React, { useState } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  ProgressBar,
  Vibration,
} from 'react-native';
import { theme } from '../../utils/theme';
import { Countdown } from '../countdown/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.2;

export const Timer = ({ focusSubject, onAppTimerEnd, clearFocus }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);

  const [progress, setProgress] = useState(1);

  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const handleProgress = (decimal) => setProgress(decimal);

  const handleChange = (ti) => {
    setMinutes(ti);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const vibrationInterval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(vibrationInterval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onTimerEnd = () => {
    vibrate();
    setProgress(1);
    setIsStarted(false);
    onAppTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          onProgress={handleProgress}
          isPaused={!isStarted}
          onEnd={onTimerEnd}
        />
      </View>
      <View
        style={{
          padding: Platform.OS === 'ios' ? theme.spacing.md : theme.spacing.lg,
        }}>
        <Text style={styles.title}> Focusing on: </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View
        style={{
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.sm,
        }}>
        <ProgressBar
          progress={progress}
          style={{
            height: 10,
            color: '#5E84E2',
          }}
        />
      </View>
      <View style={{ paddingBottom: 50, paddingTop: 50 }}>
        <Timing onChange={handleChange} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.cancelWrapper}>
        <RoundedButton size={50} title="-" onPress={clearFocus} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: theme.typography.md,
  },
  task: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: theme.typography.md,
    fontWeight: 'bold',
  },
  cancelWrapper: {
    paddingTop: theme.spacing.sm,
  },
});
