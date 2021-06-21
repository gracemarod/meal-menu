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
    display: flex;
    margin: 2em;
    align-items: left;
    flex-direction:column;
    justify-content:space-between;
    text-align: center;
    align-content:center;
    align-items:center;
    cursor: pointer;
    &:hover{
        transition: all .2s ease-in-out;
        transform: scale(1.2);
    }
    @media (max-width: 425px){
        flex-grow:0;
        flex-direction:row;
        width:90vw;
    }
`

const MealContainerImg = styled.img`
    height:20vh;
    @media (max-width: 425px){
        height:15vh;
    }
`

const MealName = styled.h4`
    font-weight:normal;
    font-size: 1.5em;

    @media (max-width: 425px){
        flex-grow:1;
        font-size: 20px;
        text-align:center;
        margin: 0 0.8em;
        width:20vh;
    }
`