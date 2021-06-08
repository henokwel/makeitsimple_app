import React, { useState, useContext } from 'react'
import {
    View, Text, StyleSheet, TextInput,
    SafeAreaView, Platform, StatusBar,
    Pressable, Alert, Modal, Dimensions,
    TouchableWithoutFeedback, Keyboard
} from 'react-native'
import { Button } from '../../components/NextBtn';
import { FontAwesome5 } from '@expo/vector-icons';
import { themes } from '../../Context/ThemeContext';
import { ContextEditer, ContextProvider } from '../../Context/MyContext';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './Task.style';
import { DismissKeyBord } from '../../components/DismissKeyboard';


const windowWidth = Dimensions.get('window').width;

 

export default function Task({ navigation }) {

    const [title, onChangeTitle] = useState("");
    const [goal, onChangeGoal] = useState("");
    const [validateTitle, setValiadateTitle] = useState(true)
    const [validateGoal, setValiadateGoal] = useState(true)

    const [modalVisible, setModalVisible] = useState(false);

    const { setupDispatch } = useContext(ContextProvider)


    const handleNext = () => {
        if (!title.trim()) {
            setValiadateTitle(!validateTitle)
            return;
        } else if (!goal.trim()) {
            setValiadateGoal(!validateGoal)
            return;
        }

        setupDispatch({ type: "task", payload: { title, goal, id: uuidv4() } })
        setValiadateGoal(true)
        setValiadateTitle(true)
        navigation.navigate('Partition')
    }

    return (
        <DismissKeyBord>
            <SafeAreaView style={styles.container}>

                <View style={styles.lable_container}>
                    <View style={styles.lable_V}>
                        <Text style={styles.lable_Text}>Set task or project name and goal</Text>
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
                    <View style={[styles.Input_Title_V, { borderLeftWidth: validateTitle ? 0 : 15, borderColor: "red" }]}>
                        <TextInput
                            onChangeText={onChangeTitle}
                            value={title}
                            style={styles.Input_Text_Style}
                            placeholder="Title"
                            placeholderTextColor={themes.light.placeHolderText}
                            multiline={true}

                        />
                        <View
                            style={{
                                borderBottomColor: themes.light.underLineColor,
                                borderBottomWidth: 1,
                                borderBottomWidth: 5,
                                width: 150
                            }}
                        />
                    </View>
                    <View style={[styles.Input_Desc_V, { borderLeftWidth: validateGoal ? 0 : 15, borderColor: "red" }]}>
                        <TextInput
                            onChangeText={onChangeGoal}
                            value={goal}
                            style={styles.Input_Text_Style}
                            placeholder="Goal"
                            placeholderTextColor={themes.light.placeHolderText}
                            multiline={true}
                        />
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                borderBottomWidth: 5,
                                width: windowWidth - 20
                            }}
                        />
                    </View>
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
