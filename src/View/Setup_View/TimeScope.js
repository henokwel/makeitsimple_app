import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from '../../components/NextBtn'
import { ContextProvider } from '../../Context/MyContext'


export default function TimeScope({ navigation }) {
    const { setup } = useContext(ContextProvider)
    console.log(setup);
    return (
        <View style={styles.container}>
            <Text>TimeScope</Text>
            <Button
                title="Next"
                onPress={() => {
                    navigation.navigate('Work')
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
