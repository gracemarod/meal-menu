import React from 'react';


class Recipe extends React.Component {
    state = {
        loadedPost:null,
        details:[]
    }
    componentDidMount(){
        console.log(this.props);
    }

    render(){
        return <div>
            Fulll Page Recipe
        </div>
    }
}

export default Recipe;