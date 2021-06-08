import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Button } from '../components/NextBtn';

const windowWidth = Dimensions.get('window').width;

export default function SetupView({ children, mode, btnTitle, btnPress }) {
    console.log(mode);


    return (
        <View style={styles.container}>
            {children}


            <View style={styles.btn_container}>
                <Button
                    title={btnTitle}
                    onPress={btnPress}

                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        alignItems: 'center',
        // justifyContent: 'center',
    },
    btn_container: {
        flex: -1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        // backgroundColor:"blue",
        width: windowWidth,
    }

})