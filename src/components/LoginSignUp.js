import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {gray600, gray800} from '../resources/Colors';

const screenWidth = Dimensions.get('window').width;

const LoginSignUp = props => {
  const {navigation} = props;

  useEffect(() => {
    AsyncStorage.getItem('showLoginSignUp').then(value => {
      if (value == 'false') {
        // navigation.navigate('BottomTabScreens');
        props.navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabScreens'}],
        });
      }
    });
    return () => {};
  }, []);
  const onLoginPress = () => {
    navigation.navigate('Login');
  };

  const onSignUpPress = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.signUpMsg}>
        {'Welcome to \n auctionsoftware.com'}
      </Text>
      <View style={styles.btnView}>
        <Pressable style={styles.loginBtnViewStyle} onPress={onLoginPress}>
          <Text style={styles.btnTextStyle}>{'Login'}</Text>
        </Pressable>

        <Pressable style={styles.signUpBtnViewStyle} onPress={onSignUpPress}>
          <Text style={styles.btnTextStyle}>{'Sign-Up'}</Text>
        </Pressable>
      </View>
      <Text style={styles.tAndcStyle}>
        {'By continuing, you are agreeing to our \n Terms and Conditions.'}
      </Text>
    </View>
  );
};

export default LoginSignUp;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  signUpMsg: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    color: gray600,
  },
  btnView: {width: screenWidth},
  loginBtnViewStyle: {
    marginHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 6,
  },
  btnTextStyle: {
    color: gray800,
    fontSize: 14,
  },
  signUpBtnViewStyle: {
    marginHorizontal: 26,
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 6,
    marginTop: 20,
  },
  tAndcStyle: {
    marginTop: 50,
    textAlign: 'center',
    color: gray600,
    fontSize: 14,
    marginBottom: 20,
  },
});
