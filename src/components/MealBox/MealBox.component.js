import React from 'react';
import styled from 'styled-components';

const MealBox = (props) => {
    return(
        <MealContainer onClick={props.clicked}>
            <MealContainerImg src={props.image} alt={props.name} />
            <MealName>{props.name}</MealName>
        </MealContainer>
    )
}
export default MealBox;

const MealContainer = styled.div`
    flex: 1;
    margin: 20px;
    align-items: left;
    justify-content: space-evenly;
    text-align: center;
    cursor: pointer;
    &:hover{
        transition: all .2s ease-in-out;
        transform: scale(1.2);
    }
`

const MealContainerImg = styled.img`
    height:20vh;
`

const MealName = styled.h4`
    font-weight:normal;
    font-size: 1.5em;

`