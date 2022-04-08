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
      <View style={{width: Dimensions.get('screen').width * 0.85}}>
        <Text style={[{textAlign: 'center'}]}>{msg}</Text>
      </View>
      <TouchableOpacity
        style={[styles.textStyle]}
        activeOpacity={1}
        onPress={retry}>
        <Text style={[{textAlignVertical: 'center'}]}>{'Retry'}</Text>
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
});
