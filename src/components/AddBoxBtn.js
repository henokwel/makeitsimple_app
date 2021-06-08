import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { themes } from '../Context/ThemeContext';


export const AddBoxBtn = ({ onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        // underlayColor={'green'}
        >
            <AntDesign name="pluscircle" size={44} color={themes.light.lable}  />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        // width: 150,
        height: 80,
        marginTop:10
    }
    
});