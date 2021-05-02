import React,{useState,} from 'react';
import './App.css';
import Router from './containers/Router/Router.component';
import {BrowserRouter} from 'react-router-dom';

import {useMediaQuery} from '@material-ui/core';

const App = () => {

  const [themeState, setTheme] = useState('Dark');

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  const themeToggler = (newTheme) => {
      setTheme(newTheme);
  }
  console.log('Toggle theme', themeState);

  return (
      <BrowserRouter>
        <Router onClick={(newTheme)=>themeToggler(newTheme)}/>
      </BrowserRouter>


  );
}

export default App;
