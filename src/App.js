import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Home from './containers/Home/Home.component';


function App() {
  return (
    <BrowserRouter>
      <div className='Home'>
        <Home/>
      </div>
    </BrowserRouter>

  );
}

export default App;
