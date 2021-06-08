import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/NextBtn'
import {
    createStackNavigator, TransitionSpecs,
    HeaderStyleInterpolators,
} from '@react-navigation/stack'

import Task from './Task'
import Task_divider from './Task_Partition'
import TimeScope from './TimeScope'
import Work from '../Work_View'

const Stack = createStackNavigator()

export default function SetUpIntro({ navigation }) {
    return (
        <Stack.Navigator
            headerMode="none"
            screenOptions={horizontalAnimation}
        >
            <Stack.Screen component={Task} name="Task" />
            <Stack.Screen component={Task_divider} name="Partition" />
            <Stack.Screen component={TimeScope} name="Time" />
            <Stack.Screen component={Work} name="Work" />
        </Stack.Navigator>
    )
}



const horizontalAnimation = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({
        current,
        layouts,
    }) => {
        // console.log(layouts);

        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                ],
            },
        };
    },
};