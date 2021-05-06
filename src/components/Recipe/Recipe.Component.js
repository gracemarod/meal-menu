import React from 'react';
import {apiCall} from '../../mealAPI.js';
import styled from 'styled-components';

class Recipe extends React.Component {
    state = {
        loadedRecipe:null,
        ingredients:null,
        ingredientsMeasurements:null,
        totalIngredients:null,
        recipe:null,
        recipeImg:null,
        ingOuterRefHeight:null,
        ingrHadLoaded:null
    }
    
    async componentDidMount(){
        let newUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.props.match.params.id;
        try {
            const myResp = await apiCall(newUrl);
            const [ingrArr, msrsArr] = await this.getIngredients(Object.entries(myResp.meals[0]));
            this.outerRef = React.createRef();
            this.setState({
                loadedRecipe:true,
                recipe:myResp.meals[0],
                ingredients: ingrArr,
                ingredientsMeasurements: msrsArr,
                recipeImg:myResp.meals[0].strMealThumb,
            });
            if(this.outerRef.current !== null) {this.setState({ingrHasLoaded:true, ingOuterRefHeight:this.outerRef.current.clientHeight})}
            if (myResp === null) this.setState({error:null}); 
        } catch(error) {
            this.setState({error:error});
        }
        
    }
    componentWillUnmount(){
        this.setState({loadedRecipe:null, ingrHasLoaded:null });
    }
    //mealsDb API sends 20 ingredients as a seperate properties,even when the recipe has less, the string would be empty or null , 
    //I'm filtering all the non-empty ingredients to group them in thei own array
    getIngredients = async (details) => {
        let resIngr = [];
        let resMsrs =[];
        let i = 0;
        for(const [key,value] of details){
            if(key.includes('strIngredient') && value !== '' && value !== null){
                resIngr.push(value);
            }else if(key.includes('strMeasure') && value !== '' && value !== null && resIngr[i] !== undefined){
                let temp = value + ' ' + resIngr[i];
                resMsrs.push(temp);
                i++;
            }else if(key.includes('strMeasure') && (value === '' || value !== null)) break;   
        }
        return [resIngr,resMsrs];
    }


    render(){
        let recipeDetails = <span>Asking the chef...</span>
        let ingredientList = null;
        let image = null;
        // console.log('Recipe Image', this.state.recipeImg);
        if(this.state.loadedRecipe){
            ingredientList = <IngsUl ref={this.outerRef}> <ul>
                    {this.state.ingredientsMeasurements.map((each, inx) => {
                        return(<li key={inx}>{each}</li>)
                    })}
                </ul> </IngsUl>

                if(this.state.ingrHasLoaded){
                    image = <Image src={this.state.recipeImg} height={this.state.ingOuterRefHeight}/>
                }
                recipeDetails = <div>
                <div>{this.state.recipe.strMeal}</div>
                    {/* <div>{this.state.recipe.strCategory}</div> */}
                    {/* <div>{this.state.recipe.strArea}</div> */}
                    <ImgIngredientsSection>
                        {image}                 
                        {ingredientList}
                    </ImgIngredientsSection>
                    </div>
        }
        return <RecipeContainer>
           {recipeDetails}
        </RecipeContainer>
    }
}

export default Recipe;

const RecipeContainer = styled.div`
    display:flex;
    justify-content:center;
    margin: 5vh 0;
`

const ImgIngredientsSection = styled.div`
    display:flex;
`

const IngsUl = styled.div`

`

const Image = styled.img`
    height:${props => props.height};
`

