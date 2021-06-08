import React, { createContext, useContext, useReducer } from 'react'
import { setupReducer } from './SetupReducer'
import { workReducer } from './WorkReducer'
import { themes } from './ThemeContext'

export const ContextEditer = createContext()


export const ContextProvider = createContext()
// export const useMyContext = useContext(ContextProvider)

export default function MyContext({ children }) {
    const [work, workDispatch] = useReducer(workReducer, "")
    const [setup, setupDispatch] = useReducer(setupReducer, "")

    return (
        <ContextProvider.Provider value={{ setup, work, setupDispatch, workDispatch }}>
            {/* <ContextEditer.Provider value={{ setupDispatch,  workDispatch }}> */}
            {children}
            {/* </ContextEditer.Provider> */}
        </ContextProvider.Provider>
    )
}


