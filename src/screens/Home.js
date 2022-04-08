import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ErrorScreen from '../components/common/ErrorScreen';
import LoadingScreen from '../components/common/LoadingScreen';
import {
  black,
  blackShin5A,
  gray200,
  gray400,
  gray500,
  gray600,
  gray700,
  gray900,
  placeHolderColor,
  white,
} from '../resources/Colors';
import UseAxios, {MethodType} from '../utils/network/UseAxios';
import {checkNetworkConnected} from '../utils/Util';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = props => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [sortByModalVisible, setSortByModalVisible] = useState(false);
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const apiObj = {
      method: MethodType.GET,
      url: 'https://reqres.in/api/users',
      headers: '',
      data: {},
    };
    checkNetworkConnected(isConnected => {
      if (isConnected) {
        UseAxios(apiObj)
          .then(response => {
            setIsLoading(false);
            setUsers(response.data);
          })
          .catch(err => {
            setIsLoading(false);
            setShowErrorScreen(true);
            setErrMsg(
              'Hey! we are unable to get data from server, please try again',
            );
          });
      } else {
        setIsLoading(false);
        setShowErrorScreen(true);
        setErrMsg(
          'No internet, Please check your internet connection and try again',
        );
      }
    });
    return () => {};
  }, [showErrorScreen]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, []);

  const backButtonHandler = () => {
    BackHandler.exitApp();
  };

  const retry = () => {
    setShowErrorScreen(false);
  };

  const onRequestClose = () => {
    setSortByModalVisible(false);
  };

  const defaultSortBy = () => {
    const sortedUserById = users.sort((a, b) => {
      return a.id - b.id;
    });
    setUsers(sortedUserById);
    setExtraData(!extraData);
    onRequestClose();
  };

  const nameSortBy = () => {
    const sortedUsersByName = users.sort((a, b) => {
      const result = a.first_name.localeCompare(b.first_name);

      return result !== 0 ? result : a.last_name.localeCompare(b.last_name);
    });
    setUsers(sortedUsersByName);
    setExtraData(!extraData);
    onRequestClose();
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          backgroundColor: white,
          marginBottom: 8,
          borderRadius: 3,
          padding: 5,
        }}>
        <Image
          source={{uri: item.avatar}}
          style={{
            height: 100,
            width: 100,
            alignSelf: 'center',
            backgroundColor: placeHolderColor,
          }}
        />
        <View style={{marginStart: 8}}>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text
              style={{
                fontSize: 16,
                color: gray700,
                fontWeight: '600',
              }}
              numberOfLines={2}>
              {item.first_name}
            </Text>
            <Text
              style={{fontSize: 16, color: gray700, fontWeight: '600'}}
              numberOfLines={2}>
              {' '}
              {item.last_name}
            </Text>
          </View>
          <Text
            style={{fontSize: 14, color: gray600, fontWeight: '400'}}
            numberOfLines={2}>
            {item.email}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.mainContainerStyle}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: gray900,
            fontWeight: '400',
            width: '80%',
          }}
          numberOfLines={1}>
          {'Welcome to users homepage'}
        </Text>
        <MaterialCommunityIcons
          name={'sort'}
          size={20}
          color={black}
          onPress={() => setSortByModalVisible(true)}
        />
      </View>
      {isLoading ? (
        <LoadingScreen color={gray500} />
      ) : showErrorScreen ? (
        <ErrorScreen msg={errMsg} retry={retry} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          extraData={extraData}
        />
      )}
      <Modal
        visible={sortByModalVisible}
        animationType={'fade'}
        onRequestClose={onRequestClose}
        transparent={true}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: blackShin5A,
          }}>
          <View
            style={{
              width: '60%',
              backgroundColor: white,
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: 8,
            }}>
            <Text style={{marginTop: -10, marginStart: -10}}>Sort By</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text onPress={defaultSortBy}>Default</Text>
              <View
                style={{
                  height: 1,
                  width: '95%',
                  backgroundColor: gray400,
                  marginVertical: 5,
                }}></View>
              <Text onPress={nameSortBy}>Name</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainerStyle: {
    backgroundColor: gray200,
    flex: 1,
  },
});
