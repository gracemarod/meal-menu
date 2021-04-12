import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Router from './containers/Router/Router.component';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Router/>
      </div>
    </BrowserRouter>

  );
}

export default App;
