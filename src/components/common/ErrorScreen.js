import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {gray600} from '../../resources/Colors';

const ErrorScreen = props => {
  const {msg, retry} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.msgCOntainer}>
        <Text style={styles.msgText}>{msg}</Text>
      </View>
      <TouchableOpacity
        style={[styles.textStyle]}
        activeOpacity={1}
        onPress={retry}>
        <Text style={styles.retryText}>{'Retry'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  mainContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
  textStyle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: gray600,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  msgCOntainer: {width: Dimensions.get('screen').width * 0.85},
  msgText: {textAlign: 'center', color: gray600},
  retryText: {textAlignVertical: 'center', color: gray600},
});
