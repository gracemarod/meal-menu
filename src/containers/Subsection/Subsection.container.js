import React from 'react';
import MealBox from '../../components/MealBox/MealBox.component';
import styled, {withTheme} from 'styled-components';

const Subsection = (props) => { 

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
        <SubsectioneContainter>
            <SubtitleText>{props.subtitle}</SubtitleText>
            {MealsList}
        </SubsectioneContainter>
    )
}

export default withTheme(Subsection);

const SubsectioneContainter = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    align-content:center;
 
`

const MealsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    align-content:center;
    flex-wrap: wrap;
    background-image: ${({ theme }) => theme.subsectionBackground};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 80vw;
    padding: 2em 0;
    margin-bottom:60px;
    border: ${({ theme }) => theme.subsectionBorder};
    
    @media (max-width: 425px){
        background-image: ${({ theme }) => theme.smallChalkBackground};
        background-attachment: fixed;
        width: 100vw;
        flex-direction:column;
        border-left:none;
        border-right:none;
    }
`

const SubtitleText = styled.h1`
        width: 10em;
        height: 70px;
        display:flex;
        justify-content:center;
        text-align:center; 
        align-items:center;
        background-color: ${({ theme }) => theme.subsectionTextBackgroundColor};
        border-radius: 5px;
        color:white;
`