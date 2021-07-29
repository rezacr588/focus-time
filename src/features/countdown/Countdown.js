import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../utils/theme';

const minutesToMilli = (minute) => minute * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);

  const [millis, setMillis] = useState(minutesToMilli(minutes));

  const minute = Math.floor(millis / 1000 / 60) % 60;

  const soconds = Math.floor(millis / 1000) % 60;

  useEffect(() => {
    setMillis(minutesToMilli(minutes));
  }, [minutes]);

  const countDown = () => {
    setMillis((time) => {
      if (time == 0) {
        clearInterval(interval.current);
        setMillis(minutesToMilli(minutes));
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMilli(minutes));
    if (millis === 0) onEnd();
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(soconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: theme.typography.xxxxl,
    fontWeight: 'bold',
    color: theme.colors.white,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
