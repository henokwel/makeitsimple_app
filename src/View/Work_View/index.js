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
import { Button } from '../../components/NextBtn'
import { set } from 'react-native-reanimated'


const viewWidth = Dimensions.get("screen").width

export default function Work({ navigation }) {
    const [feedback, setFeedBack] = useState(false)
    const [workBreak, setWorkBreak] = useState(false)
    const [workBreak_Feedback, setBreakFeedback] = useState(false)
    const [pause, setPause] = useState(false)
    const [index, setIndex] = useState(0)
    const [break_Index, setBreakIndex] = useState(0)
    const [workPatternTest, setWPT] = useState(10)

    const { setup, work } = useContext(ContextProvider)

    const { time_scope } = work
    const workPattern = time_scope.workingPattern === "305" ? 1800 : 2700
    // const workPatternTest = 10

    useEffect(() => {

        {/*
            FeedBack  
                If index is -7min before ending, Get feedback
                    A) Add 15 more minutes 
                    B) Continue timmer
                
            Break 
               If index is  0min left, Start Break
               Break Timer start
               Break should run in the background as many user will likey go to other apps.
               Enable Notification so the user can get reminder or sound singla when break is over

               If index of break is less than 0.5min, ask is user want to continue to next min-task
                   Yes ) Conntinue to new task
                   No) ReSet timmer and conitune with previous task
                   
    */}

        //_________________________


        // Paus
        //  => check current Index, 
        // SetIndex to current Index
        // ? I think when I start again it will conintune from the previous index


        // Timmer Interval
        // Get Minutes and turn into seconds

        // 1 min => 60s
        // 5 min =>  300s
        // 7 min =>  420s
        // 10 min =>  600s
        // 30 min => 1800s
        // 45 min => 2700s 

        if (pause) {
            setIndex(index)

            ///  Feedback Should only run ONCE!!
        } else if ((workPatternTest === 10 ? index : 0) === workPatternTest - 2) {

            // Get User Feedback
            // A Or B 
            // Return

            //________________________________
            setIndex(index)
            setFeedBack(true)
            setPause(true)
            return

        } else if (index === workPatternTest) {
            // Start break 
            // Before break end, ask user for feedback
            // Yes Or No 
            // Return 

            //_---------------

            // SetIndex  Pause or prevent runing
            // SetBreak ture

            // if 1 min left to break, 
            // ask if user has finish task or want to continue

            setWorkBreak(true)
            setIndex(0)

            // if (index === 4) {

            //     return
            // }


        } else if ((workBreak ? index : - 10) === 3) {
            setIndex(index + 1)
            setPause(true)
            setBreakFeedback(true)

        }
        else {
            const interval = setInterval(() => {
                workBreak ?
                    setIndex((index + 1) % (5 + 1))
                    :
                    setIndex((index + 1) % (workPatternTest + 1))
            }, 950)
            return () => {
                clearInterval(interval)
            }
        }


        // else if(index ===  index - 420 ){
        // Feedback

        //}

    }, [index, pause])


    // Feedback
    // useEffect(() => {
    // const interval = setInterval(() => {
    //     setIndex((index + 1) % (50 + 1))
    // }, 1000)
    // return () => {
    //     clearInterval(interval)
    // }
    // }, [index])


    // useEffect(() => {
    //     const nav = navigation.addListener('gestureStart', (e) => {
    //         // Do something
    //         return console.log(e);
    //     });
    //     // console.log(nav);
    // }, [navigation])

    return (
        workBreak ?
            //  Break View --------------------------------------
            <View
                style={{
                    flex: 1,
                    width: viewWidth,
                    // justifyContent: "center",
                    // alignItems: "center",
                    backgroundColor: "#84B7B6",
                    // height: 150
                }}>

                <View
                    style={{
                        // flex: 1,
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundColor: "green",
                        height: 330,
                        padding: 10,
                        width: "100%",
                    }}>

                    <Text
                        style={{
                            fontSize: 34,
                            fontWeight: "bold"

                        }}>
                        Good job !
                    </Text>

                    <Text
                        style={{
                            fontSize: 23,
                            width: "50%"
                        }}
                    >
                        Take a 5 min
                        break and move around
                    </Text>

                </View>
                <View
                    style={{
                        // flex: 1,
                        width: viewWidth,
                        // height: 200,
                        justifyContent: "center",
                        backgroundColor: "blue",
                        // height:500
                    }}
                >

                    <ProgressUI
                        step={index} steps={7} height={75}
                        pause={pause}
                        state={true}
                        type="work"
                    />

                    {
                        workBreak_Feedback ?
                            //  Break Feedback  View --------------------------------------
                            <View
                                style={{
                                    // marginTop: 50,
                                    backgroundColor: "#84B7B6",
                                    width: viewWidth,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderTopEndRadius: 20,
                                    borderTopLeftRadius: 10,
                                    paddingTop: 14
                                    // height: 300
                                }}>

                                <Text
                                    style={{
                                        fontSize: 21,
                                        width: "50%",
                                        paddingBottom: 10
                                    }}
                                >Have you finished  mini-Task-name ? </Text>
                                <Button
                                    title="Yes, what's next"
                                    size="lg"
                                    onPress={() => {
                                        // Continur Timer
                                        // 
                                        setBreakFeedback(false)
                                        setPause(false)
                                        setIndex(index + 1)
                                        /// Disptach Current task as finished and prepare next task
                                    }}
                                />
                                <View
                                    style={{ margin: 3 }}
                                />
                                <Button
                                    title="No, let's continue"
                                    size="lg"
                                    onPress={() => {
                                        setWorkBreak(false)
                                        setPause(false)
                                        setIndex(index + 1)

                                        // setWPT(workPatternTest + 5)
                                    }}
                                />

                            </View>
                            :
                            <View></View>
                    }
                </View>
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
                            }}>
                            <Text>Feedback</Text>
                            <Text>How is it going</Text>

                            <Button
                                title="It's good"
                                size="lg"
                                onPress={() => {
                                    setFeedBack(false)
                                    setPause(false)
                                    setIndex(index + 1)
                                }}
                            />
                            <View
                                style={{ margin: 10 }}
                            />
                            <Button
                                title="I need 15min"
                                size="lg"
                                onPress={() => {
                                    setFeedBack(false)
                                    setPause(false)
                                    setIndex(index + 1)
                                    setWPT(workPatternTest + 5)
                                }}
                            />
                            {/* <Pressable
                            >
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "red",
                                        height: 50,
                                        width: 200
                                    }}
                                >
                                    <Text>It's good</Text>
                                </View>
                            </Pressable>
                            <Pressable
                            >
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "grey",
                                        height: 50,
                                        width: 200
                                    }}
                                >

                                    <Text>I'm almost done, I need 15 min more</Text>
                                </View>
                            </Pressable> */}
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
                                        step={index} steps={workPatternTest} height={75}
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
