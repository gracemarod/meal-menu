import React from 'react';
import MealBox from '../../components/MealBox/MealBox.component';
import styled, {withTheme} from 'styled-components';
import ChalkBackground from '../../assets/images/chalk-background-vertical.jpg';

const Subsection = (props) => { 
    let subtitleTextColor = (props.theme.main === 'dark') ? '#1B5100' : '#CE834A';
    let subtitleBackground = (props.theme.main === 'dark') ? `background-image:linear-gradient(rgba(54, 53, 55, 0.5), rgba(54, 53, 55, 0.5)), url(${ChalkBackground})`:`background-color:#FFF`;
    let borderStyle = (props.theme.main === 'dark') ? 'solid' : 'double';
    const SubtitleContainter = styled.div`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    `

    const SubtitleText = styled.h1`
        background-color:${subtitleTextColor};
        width: 10em;
        height: 70px;
        display:flex;
        justify-content:center;
        text-align:center; 
        align-items:center;
        border-radius: 5px;
        color:white;
    `

    const MealsContainer = styled.div`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color:black;
        ${subtitleBackground};
        background-size: cover;
        background-repeat: no-repeat;
        width: 80vw;
        padding: 5em 0;
        margin-bottom:50px;
        border: 10px ${borderStyle} black;
    `

    let MealsList =  <MealsContainer>
        {props.items.map((meal) => {
            return (
                <MealBox
                    key = {meal.idMeal}
                    image = {meal.strMealThumb}
                    name = {meal.strMeal}
                    clicked={() => props.clicked(meal.idMeal)}
                />
        )})}
    </MealsContainer>;

 

    return(
        <SubtitleContainter>
            <SubtitleText>{props.subtitle}</SubtitleText>
            {MealsList}
        </SubtitleContainter>
    )
}

export default withTheme(Subsection);

