import React,{useState} from 'react';
import './App.css';
import Router from './containers/Router/Router.component';
import {BrowserRouter} from 'react-router-dom';

import {ThemeProvider} from 'styled-components';
import {lightTheme,darkTheme}from './components/Themes.Component';
import  {GlobalStyles} from './components/globalStyles.js';


const App = () => {

  const [theme, setTheme] = useState('Dark');

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const themeToggler = (newTheme) => {
    newTheme === 'Dark' ?  setTheme('light') : setTheme('dark');
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? lightTheme: darkTheme}>
      <GlobalStyles/>
      <BrowserRouter>
        <Router theme={theme} onClick={(newTheme)=>themeToggler(newTheme)}/>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
