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
        ingrHadLoaded:null,
        instructions:null
    }
    
    async componentDidMount(){
        let newUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + this.props.match.params.id;
        try {
            const myResp = await apiCall(newUrl);
            const [ingrArr, msrsArr] = await this.getIngredients(Object.entries(myResp.meals[0]));
            this.outerRef = React.createRef();
            let instructions = await this.getNumberedInstructions(myResp.meals[0].strInstructions);
            this.setState({
                loadedRecipe:true,
                recipe:myResp.meals[0],
                ingredients: ingrArr,
                ingredientsMeasurements: msrsArr,
                recipeImg:myResp.meals[0].strMealThumb,
                instructions: instructions
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

    getNumberedInstructions = async(par) => {
        let newPar = par.split(/\r?\n/);
        let res = []
        for(var i = 0 ; i < newPar.length; i++){
            if(newPar[i].match(/(\d\d\.\w)/) !== null) newPar[i] = newPar[i].split(/(?:\d\d\.)+/)[1];
            if(newPar[i] !== "" && newPar[i] !== undefined && !newPar[i].includes('STEP')) res.push(newPar[i])
        }
        return res;
    }

    render(){
        let recipeDetails = <span>Asking the chef...</span>
        let ingredientList = null;
        let image = null;
        let orderedInstructions = null;
        // console.log('Recipe Image', this.state.recipeImg);
        if(this.state.loadedRecipe){
            ingredientList = <IngsContainer ref={this.outerRef}> 
                        <h2>Ingredients</h2>
                        <IngsUl height={this.state.ingOuterRefHeight}>
                            {this.state.ingredientsMeasurements.map((each, inx) => {
                                return(<IngsLi key={inx}>
                                            {/* <IngsLabel>
                                                <IngsCheckbox type="checkbox"/>
                                                <IngsSpan></IngsSpan>
                                            </IngsLabel>  */}
                                            {each}
                                        </IngsLi>);
                            })}
                        </IngsUl> 
                    </IngsContainer>

                if(this.state.ingrHasLoaded){
                    image = <Image src={this.state.recipeImg} height={this.state.ingOuterRefHeight}/>
                }
                orderedInstructions = <InstOl> {this.state.instructions.map((e,inx) => <IngsLi key={inx}>{e}</IngsLi>)}</InstOl>;
                recipeDetails = <RecipeContents>
                    <RecipeName>{this.state.recipe.strMeal}</RecipeName>
                    {/* <div>{this.state.recipe.strCategory}</div> */}
                    {/* <div>{this.state.recipe.strArea}</div> */}
                    <ImgIngredientsSection>
                        {image}                 
                        {ingredientList}
                    </ImgIngredientsSection>
                    <InstContainer>
                        <h2>Instructions</h2>
                        {orderedInstructions} 
                    </InstContainer>
                </RecipeContents>
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
    margin: 5em 5em;
`
const RecipeContents = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const RecipeName = styled.h1`
    margin: 1em auto 3em;
    background-color: ${({ theme }) => theme.subsectionTextBackgroundColor};
    width: 15em;
    padding: 0.5em;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    text-align:center; 
    align-items:center;
    height: 70px;
    color:white;
`
const ImgIngredientsSection = styled.div`
    display:flex;
    justify-content: space-between;
    width: 65vw;
    @media (max-width: 425px){
        flex-direction:column;
        width: 100vw;
    }
`

const IngsContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px;
    width:20em;
    border: ${({ theme }) => theme.subsectionBorder};
    background-image: ${({ theme }) => theme.subsectionBackground};
    @media (max-width: 425px){
        width:90vw;
        border-left:none;
        border-right:none;
    }
`

const IngsUl = styled.ul`
    list-style: none;
    margin: 10px;
    padding: 0;
    width: 100%;
    font-size: 1em;
` 
const IngsLi = styled.li` 
    margin-bottom:10px;
`

const Image = styled.img`
    width:auto;
    min-height:40vh;
    flex-wrap: wrap;
    height:${props => props.height};
    @media (max-width: 425px){
        height:${props => props.height}+15px;
    }

`
const InstContainer = styled.div`
    margin: 60px 2em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width: 70vw;
    @media (max-width: 425px){
        width: 95vw;
    }
`

const InstOl = styled.ol`
      font-size:1.5em;
`

//not using this now, while style checkbox eventually
const IngsLabel = styled.label`
    display: block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`
const IngsCheckbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    :checked {
        display: block;
    }
`

const IngsSpan = styled.span`
    position: absolute;
    height: 25px;
    width: 25px;
    background-color: #eee;
    :after {
        content: "";
        position: absolute;
        display: none;
      }
      
`
