import React from 'react';

import { StyleSheet , Text , SafeAreaView , FlatList , View} from 'react-native';

import { RoundedButton } from "../../components/RoundedButton"

import { theme } from '../../utils/theme';

const HistoryItem = ({ item, index }) => {
  return <Text key={item.key} style={styles(item.status).historyItem}>{item.title}</Text>;
};

export const FocusList = ({ focusHistory, onClear }) => {
  const cleareHistory = () => onClear();
  return (
    <>
      <SafeAreaView style={styles().container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles().title}>{"Things we've in focus on"}</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View>
              <RoundedButton onPress={onClear} title="Clear" size={100} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = (status) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  historyItem: {
    color: status === 0 ? 'red' : 'green',
  },
  title: {
    color: 'white',
    fontSize: theme.typography.lg,
  },
});
