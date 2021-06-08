
import React, { useState, useContext } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    SafeAreaView, Platform, StatusBar,
    Pressable, Alert, Modal, Dimensions,
    TouchableWithoutFeedback, Keyboard,
    Switch
} from 'react-native'
import { Button } from '../../components/NextBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { themes } from '../../Context/ThemeContext';
import { ContextProvider } from '../../Context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './TimeScope.style';
import { DismissKeyBord } from '../../components/DismissKeyboard';


const windowWidth = Dimensions.get('window').width;


export default function TimeScope({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);

    const [time, onChangeTime] = useState("1");

    const [validateTime, setValiadateTime] = useState(true)


    const [modalVisible, setModalVisible] = useState(false);

    const { setupDispatch, setup } = useContext(ContextProvider)


    const handleNext = () => {
        // check if empty
        if (!time.trim()) {
            setValiadateTime(false)
            return;
        }
        if (isNaN(time)) {
            setValiadateTime(false)
            return;
        }

        // Check for number 

        setupDispatch({ type: "time_scope", payload: time })
        setValiadateTime(true)
        navigation.navigate('Work')
    }

    return (
        <DismissKeyBord>
            <SafeAreaView style={styles.container}>

                <View style={styles.lable_container}>
                    <View style={styles.lable_V}>
                        <Text style={styles.lable_Text}>How many hours do you estamate {setup.taskName} to complete</Text>
                    </View>
                    <View style={styles.label_info}>
                        <Pressable
                            // style={[styles.button, styles.buttonOpen]}
                            onPress={() => setModalVisible(true)}
                        >
                            <FontAwesome5 name="info-circle" size={24} color={themes.light.lable} />
                        </Pressable>
                    </View>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Guide of section !</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Btn</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}

                <View style={styles.Input_container}>
                    <View style={[styles.Input_Title_V, { borderLeftWidth: validateTime ? 0 : 15, borderColor: "red" }]}>
                        <TextInput
                            onChangeText={onChangeTime}
                            value={time.toString()}
                            style={styles.Input_Text_Style}
                            placeholder="1 hour"
                            placeholderTextColor={themes.light.placeHolderText}
                            multiline={true}
                            keyboardType="numeric"

                        />

                        <View
                            style={{
                                borderBottomColor: themes.light.underLineColor,
                                borderBottomWidth: 1,
                                borderBottomWidth: 5,
                                width: 80
                            }}
                        />
                    </View>

                    {/* 
                    Stick Mode
                
                    <Switch
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        ios_backgroundColor="#3e3e3e"
                        value={isEnabled}
                        onValueChange={() => setIsEnabled(!isEnabled)}
                    />
                     */}

                </View>
                <View style={styles.Next_btn_container}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                    />
                </View>
            </SafeAreaView>
        </DismissKeyBord>
    )
}
