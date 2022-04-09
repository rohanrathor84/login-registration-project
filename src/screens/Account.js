import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {gray800, white} from '../resources/Colors';

const Account = props => {
  const onLogOutClick = () => {
    AsyncStorage.setItem('token', '');
    AsyncStorage.setItem('showLoginSignUp', 'true');
    props.navigation.reset({
      index: 0,
      routes: [{name: 'LoginSignUp'}],
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>{'Welcome Rohan Kumar'}</Text>
      <TouchableOpacity
        style={styles.logoutBtn}
        activeOpacity={0.8}
        onPress={onLogOutClick}>
        <Text style={styles.logoutText}>{'Logout'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeText: {margin: 20, fontSize: 18, color: gray800},
  logoutBtn: {
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: white,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
  },
  logoutText: {color: gray800, fontSize: 16},
});
