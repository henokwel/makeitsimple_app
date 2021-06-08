import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import MyContext from './src/Context/MyContext';
import Home from './src/View/Home';
import Onboarding from './src/View/Onboarding';
import { Animated } from 'react-native';
import { enableScreens } from 'react-native-screens';
import SetUpIntro from './src/View/Setup_View';
// enableScreens()

const Stack = createStackNavigator()

export default function App() {
  return (
    <MyContext>
      <NavigationContainer >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Setup" component={SetUpIntro} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext>
  );
}