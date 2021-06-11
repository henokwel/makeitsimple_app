import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import MyContext from './src/Context/MyContext';
import Home from './src/View/Home';
import Onboarding from './src/View/Onboarding';
import { Animated } from 'react-native';
import { enableScreens } from 'react-native-screens';
import SetUpIntro from './src/View/Setup_View';
import Work from './src/View/Work_View';
// enableScreens()
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator()

export default function App() {
  useEffect(() => {
    try {
      AsyncStorage.clear()
      console.log("clear");
    } catch (e) {
      // clear error
      console.log("e", e);
    }
  })

  return (
    <MyContext>
      <NavigationContainer >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Setup" component={SetUpIntro} />
          <Stack.Screen name="Work" component={Work} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext>
  );
}