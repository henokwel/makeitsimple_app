import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { setupReducer } from './SetupReducer'
import { workReducer } from './WorkReducer'
import { themes } from './ThemeContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ContextEditer = createContext()


export const ContextProvider = createContext()
// export const useMyContext = useContext(ContextProvider)

export default function MyContext({ children }) {
    const [work, workDispatch] = useReducer(workReducer, "")
    const [setup, setupDispatch] = useReducer(setupReducer, "")

    useEffect(()=>{
        async function getData() {
            try {
                const jsonValue = await AsyncStorage.getItem('@storage_Key')
                const res = jsonValue != null ? JSON.parse(jsonValue) : null;
                 workDispatch({ type: "userData", payload: res })
                // console.log("res", res);
            } catch (e) {
                // error reading value
                console.log("Error Home", e);
            }
        }
        getData()        
    },[])


    return (
        <ContextProvider.Provider value={{ setup, work, setupDispatch, workDispatch }}>
            {/* <ContextEditer.Provider value={{ setupDispatch,  workDispatch }}> */}
            {children}
            {/* </ContextEditer.Provider> */}
        </ContextProvider.Provider>
    )
}


