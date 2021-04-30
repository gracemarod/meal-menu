import React from 'react';
import MealBox from '../../components/MealBox/MealBox.component';

const Subsection = (props) => { 
    let MealsList =  <div className='MealsContainer'>
        {props.items.map((meal) => {
            return (
                <MealBox
                    key = {meal.idMeal}
                    image = {meal.strMealThumb}
                    name = {meal.strMeal}
                    clicked={() => props.clicked(meal.idMeal)}
                />
        )})}
    </div>;

    return(
        <div>
            <h1>{props.subtitle}</h1>
            <div>{MealsList}</div>
        </div>
    )
}

export default Subsection;