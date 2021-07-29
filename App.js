import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import Constants from 'expo-constants';
import { FocusList } from './src/features/focus/FocusList';
import { Card } from 'react-native-paper';
import { theme } from './src/utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPELETED: 1,
  CANCELLED: 0,
};

export default function App() {
  const [focus, setFocus] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const saveHistoryItems = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadHistoryItems = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length)
        setFocusHistory(JSON.parse(history));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadHistoryItems();
  }, []);

  useEffect(() => {
    saveHistoryItems();
  }, [focusHistory]);

  const addFocusHistory = (title, status) =>
    setFocusHistory((prev) => [...focusHistory, { key: String(focusHistory.length + 1) ,title, status }]);
  const handleClearFocus = () => {
    addFocusHistory(focus, STATUSES.CANCELLED);
    setFocus(null);
  };
  const handleEndFocus = () => {
    addFocusHistory(focus, STATUSES.COMPELETED);
    setFocus(null);
  };
  console.log(focusHistory);
  const handleOnClear = () => setFocusHistory([]);
  return (
    <View style={styles.container}>
      {focus ? (
        <Timer
          onAppTimerEnd={handleEndFocus}
          clearFocus={handleClearFocus}
          focusSubject={focus}
        />
      ) : (
        <View>
          <Focus addSubject={setFocus} />
          <FocusList onClear={handleOnClear} focusHistory={focusHistory} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.darkBlue,
  },
});
