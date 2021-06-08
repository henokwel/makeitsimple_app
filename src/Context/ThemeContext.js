import React, { useState } from 'react'

export const themes = {
    light: {
        background: '#FFFAF2',
        primaryText: "#000000",
        placeHolderText: "#706F6F",
        underLineColor:"#2E3333",
        lable:"#2A5D5C"
    },
    dark: {
        background: '#2B3939',
        primaryText: '#F6F6F6',
        placeHolderText: "#FDF4D6",
        underLineColor:"#62A8A6"
    },
};

export const ThemeContext = React.createContext(
    themes.light // default value
);