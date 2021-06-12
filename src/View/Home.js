import React, { useContext, useEffect, useReducer, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/NextBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workReducer } from '../Context/WorkReducer';
import { ContextProvider } from '../Context/MyContext';

export default function Home({ navigation }) {
    const [backlog, setBacklog] = useState(null)
    // const [work, setWork] = useReducer(workReducer, null)

    const { work } = useContext(ContextProvider)
    useEffect(() => {
        // Get work from Context 
        setBacklog(work)
    }, [])


    return (
        <View style={styles.container}>
            {
                backlog === null ?
                    <>
                        <Text>MakeItSimple</Text>
                        <Text>Home</Text>
                        <Button
                            title="Next"
                            onPress={() => {
                                navigation.navigate('Setup')
                            }}
                        />
                    </>
                    :
                    <>
                        <Text>Welcome back</Text>
                        <Text> {backlog !== null ? backlog.taskName : "Loading"}</Text>
                        <Button
                            title="Continue"
                            onPress={() => {
                                navigation.navigate('Work')
                            }}
                        />
                    </>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
