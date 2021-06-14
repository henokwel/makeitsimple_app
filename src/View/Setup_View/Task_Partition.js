import React, { useContext, useState } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    SafeAreaView, Platform, StatusBar,
    Pressable, Alert, Modal, Dimensions,
    TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/NextBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { themes } from '../../Context/ThemeContext';
import { ContextProvider } from '../../Context/MyContext';
import { AddBoxBtn } from '../../components/AddBoxBtn';
import { styles } from './Task_Partition.style';
import { DismissKeyBord } from '../../components/DismissKeyboard';


const windowWidth = Dimensions.get('window').width;


export default function Task_divider({ navigation }) {
    // const [title, onChangeTitle] = useState("");
    // const [goal, onChangeGoal] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [partitionsBox, setPartitionsBox] = useState(
        [{ id: uuidv4(), title: "", description: "" }])

    const { setup, setupDispatch } = useContext(ContextProvider)
    // const { setupDispatch } = useContext(ContextEditer)

    const handleAddBox = () => {
        const currentBox = [...partitionsBox]
        // check the last box isn't empty
        const lastBox = currentBox.length - 1
        if (!currentBox[lastBox].title.trim()) return
        if (!currentBox[lastBox].description.trim()) return
        currentBox.push({ id: uuidv4(), title: "", description: "" })
        setPartitionsBox(currentBox)
    }

    const handleRemoveBox = index => {
        // console.log(index);
        const currentBox = partitionsBox.filter(item => item.id !== index)
        setPartitionsBox(currentBox)
    }


    const handleInputChange = (index, e, type) => {
        const currentBoxValue = [...partitionsBox]
        if (type === "title") {
            currentBoxValue[index].title = e
        } else {
            currentBoxValue[index].description = e
        }
        setPartitionsBox(currentBoxValue)
        // console.log(index);
    }

    const handleNext = () => {
        //  THere must be  atleast 1  mini task 
        const lastBox = partitionsBox.length - 1
        if (!partitionsBox[lastBox].title.trim()) return
        if (!partitionsBox[lastBox].description.trim()) return
        // check that mini-text isn't empty
        setupDispatch({ type: "task_parition", payload: partitionsBox })
        navigation.navigate('Time')
    }

    return (
        <DismissKeyBord>
            <SafeAreaView style={styles.container}
            // bounces={false}
            >

                <View style={styles.lable_container} >
                    <View style={styles.lable_V}>
                        <Text style={styles.lable_Text}>Divide task into small chunks</Text>
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

                            <Text>Divide your task intro small chuncks</Text>


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

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : null}
                    style={{ flex: 3 }}
                // behavior="padding"
                >
                    <View style={styles.Input_container}>
                        <ScrollView

                        // style={{ flex: 2 }}
                        // contentContainerStyle={{ flexGrow: 2 }}

                        >


                            {
                                partitionsBox.map((box, index) => {
                                    return <View
                                        key={box.id}
                                        style={styles.Input_Wrapper}>



                                        <View style={styles.Input_Title_V}>
                                            <TextInput
                                                onChangeText={(e) => handleInputChange(index, e, "title")}
                                                value={box.title}
                                                style={styles.Input_Text_Style}
                                                placeholder="Title"
                                                placeholderTextColor={themes.light.placeHolderText}
                                            // multiline={true}
                                            />
                                            <View style={styles.TextInput_RemoveBtn_continaer}>
                                                {
                                                    partitionsBox.length === 1 ?
                                                        <View></View>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={() => handleRemoveBox(box.id)}
                                                        >
                                                            <AntDesign name="closecircleo" size={30} color={themes.light.lable} />
                                                        </TouchableOpacity>
                                                }
                                            </View>
                                            {/* <View
                                                style={{
                                                    borderBottomColor: themes.light.underLineColor,
                                                    borderBottomWidth: 1,
                                                    borderBottomWidth: 5,
                                                    width: 150
                                                }}
                                            /> */}
                                        </View>
                                        <View style={styles.Input_Desc_V}>
                                            <TextInput
                                                onChangeText={(e) => handleInputChange(index, e, "desc")}
                                                value={box.description}
                                                style={styles.Input_Text_Style_Desc}
                                                placeholder="Describe task"
                                                placeholderTextColor={themes.light.placeHolderText}
                                                multiline={true}
                                            />
                                            {/* <View
                                                style={{
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                    borderBottomWidth: 5,
                                                    width: windowWidth - 20
                                                }}
                                            /> */}
                                        </View>
                                    </View>
                                })
                            }

                            <View style={{
                                alignItems: "flex-end",
                                // marginTop: 10
                                // backgroundColor:"red"
                            }}>
                                <AddBoxBtn
                                    onPress={() => handleAddBox()}
                                />
                            </View>

                        </ScrollView>

                    </View>
                </KeyboardAvoidingView>

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

