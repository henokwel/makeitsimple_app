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
        minHeight: 50
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
        minHeight: 50,
        color: themes.light.lable

    }

    // TextInput
    ,
    Input_container: {
        flex: 3,
        // backgroundColor: "#62A8A6",
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 13,
    },
    Input_Text_Style: {
        fontSize: 23,
        fontWeight: "700",
        color: themes.light.primaryText
        // textAlign: "center"
    },
    Input_Text_Style_Desc: {
        fontSize: 19,
        color: themes.light.primaryText
    },
    Input_Title_V: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        // borderBottomWidth: 5,
        marginBottom: 15,
        // backgroundColor: "red",
    },
    Input_Desc_V: {

    },
    Input_Wrapper: {
        // backgroundColor: themes.light.lable,
        margin: 5,
        borderWidth: 2,
        padding: 10,
        borderRadius: 5,
        borderColor: "grey",


    },
    TextInput_RemoveBtn_continaer: {
        width: 30,
        alignItems: "flex-end",


    },

    // Next btn 
    Next_btn_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
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
