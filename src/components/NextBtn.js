import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export const Button = ({ onPress, title, size }) => {

    var touchProps = {
        activeOpacity: 1,
        underlayColor: 'blue'
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { width: size === "lg" ? 300 : 200 }]}
        // underlayColor={'green'}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        // borderRadius: 4,
        // elevation: 3,
        backgroundColor: '#2A5D5C',
        width: 200,
        height: 70
    },
    text: {
        fontSize: 23,
        // lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 1.6,
        color: 'white',
    },
});