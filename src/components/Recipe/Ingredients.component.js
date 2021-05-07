import React from 'react';
import styled from 'styled-components';

const Ingredients = (props) => {

    const onIngredientsLoad = (ref) => {
        console.log('Ref', ref, props.outerRef)
        props.onLoad(ref);
    }

    return (
        <IngsUl onLoad={onIngredientsLoad(props.outerRef)} ref={props.outerRef}> 
            <ul> {props.ingredients.map((each, inx) => {
                return(<li key={inx}>{each}</li>)
            })}
            </ul> 
        </IngsUl>
    )
            
}

export default Ingredients;

const IngsUl = styled.div`

`