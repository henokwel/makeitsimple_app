import React, { useContext, useEffect, useReducer, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/NextBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workReducer } from '../Context/WorkReducer';
import { ContextProvider } from '../Context/MyContext';
import LottieView from 'lottie-react-native';

export default function Home({ navigation }) {

    const { work } = useContext(ContextProvider)

    return (
        <View style={styles.container}>
 
            {
                work === null ?
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
                        <Text> {work !== null ? work.taskName : "Loading"}</Text>


                        {/* <Button
                            title="Clear"
                            onPress={() => {
                                AsyncStorage.clear()
                            }}
                        /> */}

                        <Button
                            title="Continue"
                            onPress={() => {
                                navigation.navigate('Work')
                            }}
                        />
                    </>
            }
            {/* A Button for New Task and abandon the unfinsihed Task */}
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
