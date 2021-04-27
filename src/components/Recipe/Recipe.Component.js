import React from 'react';
import {apiCall} from '../../mealAPI.js';

class Recipe extends React.Component {
    state = {
        loadedRecipe:null,
        ingredients:null,
        ingredientsMeasurements:null,
        totalIngredients:null,
        recipe:null
    }
    
    async componentDidMount(){
        let newUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.props.match.params.id;
        try {
            const myResp = await apiCall(newUrl);
            const [ingrArr, msrsArr] = await this.getIngredients(Object.entries(myResp.meals[0]));
            this.setState({
                loadedRecipe:true,
                recipe:myResp.meals[0],
                ingredients: ingrArr,
                ingredientsMeasurements: msrsArr
            });
            
            if (myResp === null) this.setState({error:null}); 
        } catch(error) {
            this.setState({error:error});
        }
    }
    //mealsDb API sends 20 ingredients as a seperate properties,even when the recipe has less, the string would be empty or null , 
    //I'm filtering all the non-empty ingredients to group them in thei own array
    getIngredients = async (details) => {
        let resIngr = [];
        let resMsrs =[];
        for(const [key,value] of details){
            if(key.includes('strIngredient') && value !== '' && value !== null){
                resIngr.push(value);
            }else if(key.includes('strMeasure') && value !== '' && value !== null){
                resMsrs.push(value);
            }else if(key.includes('strMeasure') && (value === '' || value !== null)) break;   
        }
        return [resIngr,resMsrs];
    }

    render(){
        let recipeDetails = <div>Asking the chef...</div>
        if(this.state.loadedRecipe){
            recipeDetails = <div>
                <div>{this.state.recipe.strMeal}</div>
                <div>{this.state.recipe.strCategory}</div>
                <div>{this.state.recipe.strArea}</div>
                <ul>
                   <li>
                        {this.state.ingredients}
                    </li>
                </ul>
            </div>
            
        }
        return <div>
           {recipeDetails}
        </div>
    }
}

export default Recipe;