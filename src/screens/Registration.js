import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoadingScreen from '../components/common/LoadingScreen';
import {
  blackShin5A,
  gray300,
  gray400,
  gray600,
  gray800,
  gray900,
  orange400,
  red600,
  white,
} from '../resources/Colors';
import UseAxios, {MethodType} from '../utils/network/UseAxios';
import {checkNetworkConnected, isEmailValid} from '../utils/Util';

const Registration = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showEmailErrorMsg, setShowEmailErrorMsg] = useState(false);
  const [showPasswordErrMsg, setShowPasswordErrMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isModalVisble, setIsModalVisble] = useState(false);
  const [msg, setMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const onSubmitPress = () => {
    if (!isEmailValid(email)) {
      setShowEmailErrorMsg(true);
    } else {
      setShowEmailErrorMsg(false);
    }
    if (password == '' || confirmPassword == '') {
      setShowPasswordErrMsg(true);
      setErrorMsg('Password cannot be blank');
    } else {
      if (password !== confirmPassword) {
        setShowPasswordErrMsg(true);
        setErrorMsg('Password and confirm password not matched');
      } else {
        setShowPasswordErrMsg(false);
      }
    }
    if (
      isEmailValid(email) &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    ) {
      setShowLoading(true);
      const apiObj = {
        method: MethodType.POST,
        url: 'https://reqres.in/api/register',
        headers: '',
        data: {
          email: email,
          password: password,
        },
      };
      checkNetworkConnected(isConnected => {
        if (isConnected) {
          UseAxios(apiObj)
            .then(response => {
              setShowLoading(false);
              AsyncStorage.setItem('token', response.token);
              AsyncStorage.setItem('showLoginSignUp', 'false');
              props.navigation.reset({
                index: 0,
                routes: [{name: 'BottomTabScreens'}],
              });
            })
            .catch(err => {
              setShowLoading(false);
              setMsg('Not able to register user.');
              setIsModalVisble(true);
            });
        } else {
          setShowLoading(false);
          setMsg(
            'No internet, Please check your internet connection and try again.',
          );
          setIsModalVisble(true);
        }
      });
    }
  };

  const onRequestClose = () => {
    setIsModalVisble(false);
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.subMainContainer}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            returnKeyType="go"
            placeholder={`${'Email id'}*`}
            value={email}
            placeholderTextColor={gray400}
            underlineColorAndroid={white}
            onChangeText={text => setEmail(text)}
          />
          {showEmailErrorMsg ? (
            <Text style={styles.errorTextView}>
              {'Please enter correct email id'}
            </Text>
          ) : (
            <Text style={styles.errorTextView}>{''}</Text>
          )}
          <TextInput
            style={styles.input}
            returnKeyType="go"
            keyboardType="default"
            placeholder={`${'Password'}*`}
            value={password}
            placeholderTextColor={gray400}
            underlineColorAndroid={white}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <Text style={styles.errorTextView}>{''}</Text>
          <TextInput
            style={styles.input}
            returnKeyType="go"
            keyboardType="default"
            placeholder={`${'Confirm Password'}*`}
            value={confirmPassword}
            placeholderTextColor={gray400}
            underlineColorAndroid={white}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
          />
          {showPasswordErrMsg ? (
            <Text style={styles.errorTextView}>{errorMsg}</Text>
          ) : (
            <Text style={styles.errorTextView}>{''}</Text>
          )}
          <TouchableOpacity
            style={styles.buttonTextStyle}
            activeOpacity={1}
            onPress={onSubmitPress}>
            <Text style={{color: white}}>{'Sign Up'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.titleView}>
        <Text style={styles.titleTextStyle}>{'Please Register'}</Text>
      </View>

      {showLoading ? (
        <View style={styles.loadingView}>
          <LoadingScreen color={white} />
        </View>
      ) : (
        <></>
      )}

      <Modal
        visible={isModalVisble}
        animationType={'slide'}
        onRequestClose={onRequestClose}
        transparent={true}>
        <View style={styles.modalViewContainer}>
          <View style={styles.viewBox}>
            <Text style={styles.msgTextStyle}>{msg}</Text>
            <Text style={styles.okTextStyle} onPress={onRequestClose}>
              {'Ok'}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: white, flex: 1, justifyContent: 'center'},
  subMainContainer: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: gray300,
    borderRadius: 3,
    height: 40,
    backgroundColor: white,
    padding: 10,
    color: gray800,
  },
  errorTextView: {
    color: red600,
    paddingVertical: 3,
    fontSize: 10,
  },
  buttonTextStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: orange400,
    borderRadius: 3,
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleView: {position: 'absolute', top: 15, left: 15},
  titleTextStyle: {fontSize: 18, marginBottom: 30, color: gray900},
  modalViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: blackShin5A,
  },
  viewBox: {
    width: '60%',
    backgroundColor: white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  msgTextStyle: {textAlign: 'center', color: gray600, fontSize: 14},
  okTextStyle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    color: gray800,
    fontSize: 16,
  },
  loadingView: {
    position: 'absolute',
    backgroundColor: blackShin5A,
    width: '100%',
    height: '100%',
  },
});
