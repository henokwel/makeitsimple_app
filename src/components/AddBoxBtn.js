import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';


export const AddBoxBtn = ({ onPress }) => {

    
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        // underlayColor={'green'}
        >
            <AntDesign name="pluscircle" size={44} color="black" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        // borderRadius: 4,
        // elevation: 3,
        // backgroundColor: 'black',
        width: 150,
        height: 80
    }
    
});