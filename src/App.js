import React from 'react';
import './App.css';
import MealsGrid from './MealsGrid/MealsGrid.component';
import Searches from './Searches/Searches.component';


function App() {
  return (
    <div>
        <Searches/>
        <MealsGrid/>
    </div>
  );
}

export default App;
