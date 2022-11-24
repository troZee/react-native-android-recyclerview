import * as React from 'react';

import { StyleSheet, View } from 'react-native';
// import { RecyclerviewView } from 'react-native-recyclerview';
import RecyclerViewDemo from './RecyclerViewDemo';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <RecyclerviewView color="#32a852" style={styles.box} /> */}
      <RecyclerViewDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
