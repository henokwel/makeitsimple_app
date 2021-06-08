import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '../../components/NextBtn'

export default function Task_Summary() {
    return (
        <View>
            <Text>Task Summary</Text>
            <Button
                title="Next"
                onPress={() => {
                    navigation.navigate('Work')
                }}
            />
        </View>
    )
}
