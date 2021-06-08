import { StyleSheet } from "react-native";
import { themes } from "../../Context/ThemeContext";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: "#FFFAF2",
        paddingTop: 25,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: Platform.OS === "andriod" ? StatusBar.currentHeight : 0
    }
    // TextInput Label
    ,
    lable_container: {
        flex: 1,
        alignItems: "flex-end",
        paddingLeft: 12,
        paddingRight: 12,
        // justifyContent: "space-between",
        flexDirection: "row",
        // backgroundColor: "grey"
    },
    lable_V: {
        flex: 1,

        // backgroundColor:"#FDF4D6",
        minHeight: 100
    },
    lable_Text: {
        fontSize: 23,
        fontWeight: "700",
        color: themes.light.lable
    },
    label_info: {
        flex: -1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 4,
        // backgroundColor:"brown",
        minHeight: 100,
        color: themes.light.lable

    }

    // TextInput
    ,
    Input_container: {
        flex: 2,
        // backgroundColor: "#62A8A6",
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 13
    },
    Input_Text_Style: {
        fontSize: 25,
        fontWeight: "700",
        // textAlign: "center"
    },
    Input_Title_V: {
        // borderBottomWidth: 5,
        marginBottom: 35,
        // backgroundColor:"red"




    },
    Input_Desc_V: {

    }

    // Next btn 
    ,
    Next_btn_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end"
    },


    modalView: {
        margin: 20,
        backgroundColor: themes.light.lable,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }



});
