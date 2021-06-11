import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/NextBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Home({ navigation }) {
    const [backlog, setBacklog] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const jsonValue = await AsyncStorage.getItem('@storage_Key')
                const res = jsonValue != null ? JSON.parse(jsonValue) : null;
                setBacklog(res)
                console.log(res);
            } catch (e) {
                // error reading value
                console.log("Error Home", e);
            }
        }
        getData()
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
