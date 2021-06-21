
import React, { useState, useContext } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    SafeAreaView, Platform, StatusBar,
    Pressable, Alert, Modal, Dimensions,
    TouchableWithoutFeedback, Keyboard,
    Switch, Button, TouchableOpacity
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button as ButtonNext } from '../../components/NextBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { themes } from '../../Context/ThemeContext';
import { ContextProvider } from '../../Context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './TimeScope.style';
import { DismissKeyBord } from '../../components/DismissKeyboard';


const windowWidth = Dimensions.get('window').width;


export default function TimeScope({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [defaultWorkingPatter, setdefaultWorkingPatter] = useState(true)
    const [time, onChangeTime] = useState("1");

    const [validateTime, setValiadateTime] = useState(true)



    const [modalVisible_Time, setModalVisible_Time] = useState(false);
    const [modalVisible_Pattern, setModalVisible_Pattern] = useState(false);

    const { setupDispatch, setup } = useContext(ContextProvider)

    const handleWorkingPattern = (type) => {

        // if the default change, change State
        // if state change again, reverse state
        if (type === "default") {
            setdefaultWorkingPatter(true)
        } else {
            setdefaultWorkingPatter(false)
        }
    }

    const handleNext = async () => {
        try {

            if (!time.trim()) {
                setValiadateTime(false)
                return;
            }
            if (isNaN(time)) {
                setValiadateTime(false)
                return;
            }

            // Check for number 

            // setupDispatch({ type: "time_scope", payload: { time, work_pattern: defaultWorkingPatter ? "305" : "451" } })

            const jsonValue = JSON.stringify({ ...setup, time, work_pattern: defaultWorkingPatter ? "305" : "451" })
            console.log(setup);

            await AsyncStorage.setItem('@storage_Key', jsonValue)
            setValiadateTime(true)
            navigation.navigate('Work')
        } catch (error) {
            console.log("error", error);
        }
        // check if empty
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
                            onPress={() => setModalVisible_Time(true)}
                        >
                            <FontAwesome5 name="info-circle" size={24} color={themes.light.lable} />
                        </Pressable>
                    </View>
                </View>

                {/* Modal View Time */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible_Time}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible_Time(!modalVisible_Time);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Time estamate !</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible_Time(!modalVisible_Time)}
                            >
                                <Text style={styles.textStyle}>Hide Btn</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* Modal View Time*/}

                {/* Modal View Pattern */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible_Pattern}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible_Pattern(!modalVisible_Pattern);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Pattern !</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible_Pattern(!modalVisible_Pattern)}
                            >
                                <Text style={styles.textStyle}>Hide Pattern Btn</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* Modal View Pattern*/}
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



                    <View style={styles.lable_container}>
                        <View style={[styles.lable_V, { minHeight: 40 }]}>
                            <Text style={styles.lable_Text}>Choose working pattern</Text>
                        </View>
                        <View style={[styles.label_info, { minHeight: 40 }]}>
                            <Pressable
                                // style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisible_Time(true)}
                            >
                                <FontAwesome5 name="info-circle" size={24} color={themes.light.lable} />
                            </Pressable>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            // backgroundColor: "#62A8A6"
                        }}>

                        {/* <TouchableOpacity
                            style={styles.buttonPatter}
                        // underlayColor={'green'}
                        >
                            <Text >30 min and 5 min</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonPatter}
                        // underlayColor={'green'}
                        >
                            <Text >30 min and 5 min</Text>
                        </TouchableOpacity> */}


                        {/* Stick Mode */}

                        <View
                            style={{
                                // backgroundColor:"red",
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: 15

                            }}>

                            <Switch
                                thumbColor={defaultWorkingPatter ? themes.light.lable : "#4F4C4C"}
                                trackColor={{ false: "#767577", true: "#84B7B6" }}
                                ios_backgroundColor="#FFFAF2"
                                value={defaultWorkingPatter}
                                onValueChange={() => handleWorkingPattern("default")}
                                style={{ marginLeft: 15 }}
                            />
                            <Text
                                style={{
                                    fontSize: 19, fontWeight: "bold", color: "black",
                                    paddingLeft: 10
                                }}>
                                30 min and 5 min
                            </Text>
                        </View>
                        <View
                            style={{
                                // backgroundColor:"red",
                                flexDirection: "row",
                                alignItems: "center",

                            }}>

                            <Switch
                                thumbColor={!defaultWorkingPatter ? themes.light.lable : "#4F4C4C"}
                                trackColor={{ false: "#767577", true: "#84B7B6" }}
                                ios_backgroundColor="#FFFAF2"
                                value={!defaultWorkingPatter}
                                onValueChange={() => handleWorkingPattern("notDefault")}
                                style={{ marginLeft: 15 }}
                            />
                            <Text
                                style={{
                                    fontSize: 19, fontWeight: "bold", color: "black",
                                    paddingLeft: 10

                                }} >
                                45 min and 10 min</Text>
                        </View>


                    </View>


                </View>
                <View style={styles.Next_btn_container}>
                    <ButtonNext
                        title="Next"
                        onPress={handleNext}
                    />
                </View>
            </SafeAreaView>
        </DismissKeyBord>
    )
}
