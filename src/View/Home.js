import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../components/NextBtn';



export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>MakeItSimple</Text>
            <Text>Home</Text>

            <Button
                title="Next"
                onPress={() => {
                    navigation.navigate('Setup')
                }}
            />

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
