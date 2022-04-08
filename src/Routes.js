import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Home from './screens/Home';
import Account from './screens/Account';
import Login from './screens/Login';
import Registration from './screens/Registration';
import {gray400, white, redShade, gray800, gray200} from './resources/Colors';
import LoginSignUp from './components/LoginSignUp';

const Routes = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const tabScreenOptions = {
    headerShown: false,
    tabBarActiveTintColor: redShade,
    tabBarInactiveTintColor: gray800,
    tabBarStyle: styles.barStyle,
  };

  function BottomTabScreens() {
    return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="history"
        screenOptions={tabScreenOptions}>
        <Tab.Screen
          name="HomeScreen"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'home'} size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={Account}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name={'user'} size={20} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainerStyle}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          initialRouteName={'LoginSignUp'}
          screenOptions={screenOptions}
          backBehavior="history">
          <Stack.Screen name={'LoginSignUp'} component={LoginSignUp} />
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'Registration'} component={Registration} />
          <Stack.Screen
            name={'BottomTabScreens'}
            component={BottomTabScreens}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Routes;

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: white,
    borderTopColor: gray400,
    borderTopWidth: 1,
  },
  mainContainerStyle: {
    backgroundColor: gray200,
    flex: 1,
  },
});
