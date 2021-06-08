import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

export const DismissKeyBord = ({ children }) => {
    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
}