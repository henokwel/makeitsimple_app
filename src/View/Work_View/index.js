import React, { useRef, useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import {
    View, Text, Dimensions,
    Animated, Pressable, Vibration,
} from 'react-native'
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { styles } from './work.style'
import { ContextProvider } from '../../Context/MyContext'
import { ProgressUI } from '../../components/ProgressUI'
import { Button } from '../../components/NextBtn'

const viewWidth = Dimensions.get("screen").width

export default function Work({ navigation }) {
    const [feedback, setFeedBack] = useState(false)
    const [workBreak, setWorkBreak] = useState(false)
    const [workBreak_Feedback, setBreakFeedback] = useState(false)
    const [pause, setPause] = useState(false)
    const [index, setIndex] = useState(0)
    const [break_Index, setBreakIndex] = useState(0)
    const { work } = useContext(ContextProvider)
    const { task_paritions, taskName, taskGoal, work_pattern } = work
    const [workPatternTest, setWPT] = useState(work_pattern === "305" ? 1800 : 2700)
    const [minTask, setNextMiniTask] = useState({ current: 0, size: task_paritions.length })
    // console.log(task_paritions[minTask.current]);
    // console.log(minTask);


    /// handle Break btn 
    const handleBreakFeedback = ({ type, index }) => {

        switch (type) {
            case "next": {
                // console.log("Next", index);
                setBreakFeedback(false)
                setPause(false)
                setIndex(index + 1)
                /// Disptach Current task as finished and prepare next task
                setNextMiniTask({ current: minTask.current + 1, size: task_paritions.length })
                setWorkBreak(false)
            }
                break;

            case "continue": {
                // console.log("continue", index);
            }
                break;

            default:
                break;
        }
    }

    const handleOnFinish = async () => {
        // console.log("Handle Finish ");

        // Reset all State
        // setFeedBack(false)
        // setWorkBreak(false)
        // setBreakFeedback(false)
        // setPause(false)
        // setIndex(0)
        // setWPT(10)
        // Clean AsyncStorage 
        // Naviagte to Home, ready for next Setup
        try {
            // await AsyncStorage.clear()
            await AsyncStorage.removeItem('@storage_Key')

            navigation.navigate("Setup")
        } catch (error) {
            console.log("Error handle finish fn", error);

        }
    }


    // const { time_scope } = work
    // const workPattern = time_scope.workingPattern === "305" ? 1800 : 2700
    // const workPatternTest = 10

    useEffect(() => {
        // console.log("Work data", work);

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

        {/*
            
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
    */}

        if (pause) {
            setIndex(index)

            ///  Feedback Should only run ONCE!! 5 Min Before timmer ends
        } else if ((workPatternTest === workPatternTest ? index : 0) === workPatternTest - 300) {
            console.log("Work Feedback Only Once---- Runing");

            // Get User Feedback
            // A Or B 
            // Return

            //________________________________
            setIndex(index)
            setFeedBack(true)
            setPause(true)
            return

        } else if (index === workPatternTest) {
            {/*           // Start break 
            // Before break end, ask user for feedback
            // Yes Or No 
            // Return 

            //_---------------

            // SetIndex  Pause or prevent runing
            // SetBreak ture

            // if 1 min left to break, 
            // ask if user has finish task or want to continue*/}

            setWorkBreak(true)
            setIndex(0)


            // ==>>  5 min before timmer End Start Feedback in WORK   <<===

        } else if ((workBreak ? index : - 10) === 300) {

            // Start Breaks Feedback 

            // console.log("Runnning...........");
            // setIndex(index + 1)
            // setPause(true)
            setBreakFeedback(true)

        }

        // Turn on Work 
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

    // console.log("minTask Current", minTask.current);
    // console.log("minTask Length", minTask.size);

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
                            // backgroundColor: "green",
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
                            }}>
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
                            // backgroundColor: "blue",
                            // height:500
                        }}>

                        <ProgressUI
                            step={index} steps={7} height={75}
                            pause={pause}
                            state={true}
                            type="work"
                        />

                        {
                            workBreak_Feedback ?

                                //  Break feedback  View --------------------------------------

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
                                        }}>
                                        Have you finished  {task_paritions[minTask.current].title} ?
                                    </Text>

                                    {/* If there is 0 task left, show Finish btn */}



                                    {
                                        minTask.current === minTask.size - 1 ?
                                            <Button
                                                title="Finish"
                                                size="lg"
                                                onPress={() => handleOnFinish()}
                                            />
                                            :
                                            <>
                                                <Button
                                                    title="Yes, what's next"
                                                    size="lg"
                                                    onPress={() => {
                                                        // Continur Timer
                                                        // 
                                                        handleBreakFeedback({ type: "next", index })
                                                        // setBreakFeedback(false)
                                                        // setPause(false)
                                                        // setIndex(index + 1)
                                                        // /// Disptach Current task as finished and prepare next task
                                                        // setNextMiniTask({ current: minTask.current + 1 })
                                                    }}
                                                />
                                                <View
                                                    style={{ margin: 3 }}
                                                />
                                                <Button
                                                    title="No, let's continue"
                                                    size="lg"
                                                    onPress={() => {
                                                        handleBreakFeedback({ type: "continue", index })
                                                        // setWorkBreak(false)
                                                        // setPause(false)
                                                        // setIndex(index + 1)
                                                        // setWPT(workPatternTest + 5)
                                                    }}
                                                />
                                            </>
                                    }
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
                            // width: "100%",
                            justifyContent: "center",
                            // alignItems:"flex-start",
                            paddingLeft: 10,
                            // alignItems: "flex-start",
                            // padding: 20
                        }}
                    >
                        <Text style={styles.miniTitle}>
                            {task_paritions[minTask.current].title}
                        </Text>
                        <Text style={styles.miniDesc}>
                            {task_paritions[minTask.current].description}
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
                                    width: viewWidth,
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
                                        setWPT(workPatternTest + 15)
                                    }}
                                />
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
                                        zIndex: 0
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
                                        {/* <Text style={{ fontSize: 34, fontWeight: "bold" }}>"</Text> */}
                                        {taskGoal}
                                        {/* <Text style={{ fontSize: 34, fontWeight: "bold" }}>"</Text> */}
                                    </Text>
                                    <Text style={[styles.miniTitle, { alignSelf: "flex-end", paddingRight: 15, marginTop: 14 }]}>
                                        {taskName}
                                    </Text>
                                </View>
                            </>
                        //  Work  View END --------------------------------------
                    }
                </View>
    )
}