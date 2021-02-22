import React from 'react';
import './Search.css';


const Search = (props) => {
    return (
        <div className='SearchContainer'>
            <div>{props.type}</div>
            <input type='text' onKeyDown={props.keyDown}/>
        </div>
    )
}

export default Search;