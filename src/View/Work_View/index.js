import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

export default function Work({navigation}) {
    return (
        <View style={styles.container}>
            <Text>Work</Text>
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
