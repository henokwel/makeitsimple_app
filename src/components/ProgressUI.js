import React, { useRef, useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    View, Text, Dimensions,
    Animated, Pressable, Vibration,
} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { styles } from '../View/Work_View/work.style'

import { ContextEditer } from '../Context/MyContext'


const viewWidth = Dimensions.get("screen").width

export const ProgressUI = ({ step, steps, height, state, pause, type }) => {
    const [width, setWidth] = useState(0)
    const animatedValue = useRef(new Animated.Value(-1000)).current
    const reactive = useRef(new Animated.Value(-1000)).current

    useEffect(() => {
        const animatedTiming = Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        })
        state ? animatedTiming.start() : animatedTiming.stop()
    }, [])

    useEffect(() => {
        reactive.setValue(-width + (width * step) / steps)
    }, [step, width])

    return <View
        onLayout={e => {
            const newWidth = e.nativeEvent.layout.width
            setWidth(newWidth)
        }}
        style={{
            height,
            // backgroundColor: "brown",
            // borderRadius: height,
            overflow: "hidden",
            borderTopWidth: 3,
            // borderBottomWidth: 3,
            borderColor: type !== "work" ? !pause ? "#84B7B6" : "#DBD5A5" : "black"
            // width:viewWidth
        }}
    >
        <Animated.View
            style={{
                height,
                width: "100%",
                // borderRadius: height,
                backgroundColor: type !== "work" ? !pause ? "#84B7B6" : "#DBD5A5" : "black",
                position: "absolute",
                top: 0,
                left: 0,
                transform: [
                    {
                        translateX: animatedValue
                    }
                ]
            }}
        />
        <Text style={{ color: "white" }}>{step} / {steps}</Text>
    </View>
}
