import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Logo, Right} from "../components/Header";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const ScreenOptions = {
  headerTitle: props => <Logo {...props} />,
  headerRight: () => {
    return <Right />
  },
  headerStyle: {
    elevation: 0,
    height: 100,
    // backgroundColor: 'transparent',
    backgroundColor: 'white',
    // borderBottomWidth: 1,
  },
};

const MainNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={ScreenOptions} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default MainNavigation;