import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

console.log(localStorage.getItem('themeMode'))

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
 
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(()=>(localStorage.getItem("colorMode")?localStorage.getItem("colorMode"):'#03C9D7')) ;
  const [currentMode, setCurrentMode] = useState(()=>(localStorage.getItem("themeMode")?localStorage.getItem("themeMode"):'Light') );
  const [theme, setTheme] = useState(()=>(    currentMode == 'Dark' ? '#33373E' : '#fff'));
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);


  const setMode = (e) => {
    setCurrentMode(e.target.value);
    currentMode !== 'Dark' ? setTheme('#33373E') : setTheme('#fff')
      
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) =>
   setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ theme, setTheme,currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
