import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

function LoadingIndicator(props) {
  const { text } = props;

  return (
    <View styles={styles.indicator}>
      <ActivityIndicator size={100} color="#8b0000" />
      <Text style={styles.indicatorText}> {text} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    marginTop: 130
  },
  indicatorText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 30
  }
});

export default LoadingIndicator