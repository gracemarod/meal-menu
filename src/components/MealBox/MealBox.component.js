import React from 'react';
import './MealBox.css';

const MealBox = (props) => {
    return(
        <div className='MealContainer' onClick={props.clicked}>
            <img src={props.image} alt="Meal" />
            <div>{props.name}</div>
        </div>
    )
}
export default MealBox;