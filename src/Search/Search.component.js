import React from 'react';
import './Search.css';

const Search = (props) => {
    return (
        <div className='SearchContainer'>
            <div>{props.type}</div>
            <input/>
        </div>
    )
}

export default Search;