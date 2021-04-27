import React from 'react';
import {apiCall} from '../../mealAPI.js';

class Recipe extends React.Component {
    state = {
        loadedRecipe:null,
        recipeDetails:{}
    }
    
    async componentDidMount(){
        let newUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.props.match.params.id;
        try {
            const myResp = await apiCall(newUrl);
            this.setState({
                loadedRecipe:true,
                recipeDetails:myResp.meals[0]
            });
            if (myResp === null) this.setState({error:null}); 
        } catch(error) {
            this.setState({error:error});
        }
    }

    render(){
        if(this.state.loadedRecipe){
            console.log('Recipe', this.state.recipeDetails);
        }
        return <div>
            Fulll Page Recipe
        </div>
    }
}

export default Recipe;