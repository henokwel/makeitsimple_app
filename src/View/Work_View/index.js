import React, { useRef, useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    View, Text, Dimensions,
    Animated, Pressable, Vibration,
} from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { styles } from './work.style'
import { ContextProvider } from '../../Context/MyContext'
import { ProgressUI } from '../../components/ProgressUI'

const viewWidth = Dimensions.get("screen").width

export default function Work({ navigation }) {
    const [feedback, setFeedBack] = useState(false)
    const [workBreak, setWorkBreak] = useState(false)
    const [pause, setPause] = useState(false)
    const [index, setIndex] = useState(0)

    const { setup } = useContext(ContextProvider)

    console.log(setup);

    useEffect(() => {
        // Paus
        //  => check current Index, 
        // SetIndex to current Index
        // ? I think when I start again it will conintune from the previous index
        if (pause) {
            setIndex(index)
        } else {
            // Timmer Interval
            // Get Minutes and turn into seconds
            const interval = setInterval(() => {
                setIndex((index + 1) % (60 + 1))
            }, 980)
            return () => {
                clearInterval(interval)
            }
        }
    }, [index, pause])

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setIndex((index + 1) % (50 + 1))
    //     }, 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [index])

    useEffect(() => {
        const nav = navigation.addListener('gestureStart', (e) => {
            // Do something
            return console.log(e);
        });
        console.log(nav);
    }, [navigation])

    return (
        workBreak ?
            //  Break View --------------------------------------
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
            //  Break View  END --------------------------------------
            :
            //  Work View --------------------------------------

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
                    //  Work View  END --------------------------------------

                    feedback === true ?
                        //  FeedBack  View --------------------------------------
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

                        //  FeedBack  View  END--------------------------------------
                        :
                        //  Work  View --------------------------------------
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

                                <Pressable
                                    onPress={() => {
                                        // Vibration.vibrate()
                                        setPause(!pause)
                                    }
                                    }>
                                    {/* <Text style={styles.text}>Progress bar</Text> */}
                                    <ProgressUI
                                        step={index} steps={60} height={75}
                                        state={true} pause={pause}
                                    />
                                </Pressable>
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
                                <Text style={[styles.miniTitle, { alignSelf: "flex-end", paddingRight: 15, marginTop: 14 }]}>
                                    - Unamed
                                </Text>
                            </View>
                        </>
                    //  Work  View END --------------------------------------
                }
            </View>
    )
}
