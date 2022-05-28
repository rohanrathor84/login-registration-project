import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const PleaceHolderDetail = props => {
  //   console.log(props.route.params.data);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          height: 200,
          flex: 1,
          margin: 10,
          backgroundColor: 'gray',
          alignItems: 'center',
        }}>
        <Text style={{color: 'black'}}>{item.id}</Text>
        <Text style={{color: 'black'}}>{item.body}</Text>
        <Text style={{color: 'black'}}>{item.title}</Text>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={props.route.params.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default PleaceHolderDetail;

const styles = StyleSheet.create({});
