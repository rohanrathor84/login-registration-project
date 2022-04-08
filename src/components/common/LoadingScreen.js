import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingScreen = props => {
  const {color} = props;
  return (
    <View style={styles.mainContainer}>
      <ActivityIndicator color={color} size={'large'} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
