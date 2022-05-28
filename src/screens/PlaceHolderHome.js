import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getPlaceHolderData} from '../redux/actions';

const PlaceHolderHome = props => {
  const dispatch = useDispatch();
  const {jsonHolder} = useSelector(state => state.userReducer);
  const [finalArr, setFinalArr] = useState([]);

  useEffect(() => {
    dispatch(getPlaceHolderData());
    // console.log(JSON.stringify(jsonHolder));
    // Jest framework for unit test cases
    return () => {};
  }, []);

  useEffect(() => {
    if (jsonHolder && jsonHolder != null) {
      let Arr = [];
      for (let i = 0; i < jsonHolder.length; i++) {
        let obj = {};
        obj.userId = jsonHolder[i].userId;
        obj.data = [];
        if (
          jsonHolder[i].userId === jsonHolder[i + 1].userId &&
          i < jsonHolder.length
        ) {
          while (
            jsonHolder[i].userId === jsonHolder[i + 1].userId &&
            i < jsonHolder.length
          ) {
            obj.data.push(jsonHolder[i]);
            i++;
            if (i === jsonHolder.length - 1) {
              break;
            }
          }
        }
        Arr.push(obj);
      }
      setFinalArr(Arr);
    }
    return () => {};
  }, [jsonHolder]);

  const onPress = item => {
    props.navigation.navigate('PleaceHolderDetail', {
      data: item.data,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          height: 30,
          flex: 1,
          margin: 10,
          backgroundColor: 'gray',
          alignItems: 'center',
        }}
        onPress={() => onPress(item)}>
        <Text style={{color: 'black'}}>{item.userId}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={finalArr}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Text></Text>
    </View>
  );
};

export default PlaceHolderHome;

const styles = StyleSheet.create({});
