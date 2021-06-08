import React, { useRef, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native'

import { styles } from './work.style'

const viewWidth = Dimensions.get("screen").width

const ProgressUI = ({ step, steps, height }) => {
    const [width, setWidth] = useState(0)
    const animatedValue = useRef(new Animated.Value(-1000)).current
    const reactive = useRef(new Animated.Value(-1000)).current



    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: reactive,
            duration: 300,
            useNativeDriver: true
        }).start()

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
            borderBottomWidth: 3,
            borderColor: "#84B7B6"
            // width:viewWidth
        }}
    >
        <Animated.View
            style={{
                height,
                width: "100%",
                // borderRadius: height,
                backgroundColor: "#84B7B6",
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
    </View>
}

export default function Work({ navigation }) {
    const [feedback, setFeedBack] = useState(false)
    const [workBreak, setWorkBreak] = useState(false)

    const [index, setIndex] = useState(0)


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIndex((index + 1) % (50 + 1))

    //     }, 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [index])

    return (

        workBreak ?
            <View
                style={{
                    flex: 1,
                    backgroundColor: "grey",
                    width: viewWidth,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>Hello world</Text>
            </View>
            :
            <View style={styles.container}>
                <StatusBar />
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                        // backgroundColor: "grey",
                        // width: viewWidth - 50,
                        justifyContent: "center",
                        paddingLeft: 10,
                        // alignItems: "flex-start",
                        // padding: 20
                    }}
                >
                    <Text style={styles.miniTitle}>Mini Task Title</Text>
                    <Text style={styles.miniDesc}>
                        Mini Task Description and other detail related to the task
                    </Text>
                </View>
                {
                    feedback === true ?
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: "#84B7B6",
                                width: viewWidth
                                ,
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopEndRadius: 20,
                                borderTopLeftRadius: 10
                            }}
                        >
                            <Text>Feedback</Text>
                        </View>
                        :
                        <>
                            <View
                                style={{
                                    // flex: 1,
                                    // backgroundColor: "#B09F63",
                                    margin: 10,
                                    width: viewWidth,
                                    justifyContent: "center",
                                }}
                            >
                                {/* <Text style={styles.text}>Progress bar</Text> */}
                                <ProgressUI step={index} steps={50} height={75}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    // backgroundColor: "blue", 
                                    width: viewWidth - 40,
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                    paddingLeft: 10,

                                }}
                            >
                                <Text style={[styles.miniDesc, { fontSize: 21, alignSelf: "center" }]}>
                                    <Text style={{ fontSize: 34, fontWeight: "bold" }}>"</Text>
                                    Mini Task Description and other detail related to the task
                                    <Text style={{ fontSize: 34, fontWeight: "bold" }}>"</Text>

                                </Text>
                                <Text style={[styles.miniTitle, { alignSelf: "flex-end", paddingRight: 15, marginTop: 14 }]}> - Unamed</Text>
                            </View>
                        </>
                }


            </View>





    )
}
