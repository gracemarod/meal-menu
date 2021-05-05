import React from 'react';
import searchIcon from '../../assets/images/search.png';
import SearchBackground from '../../assets/images/cutting-board.jpg';
import {apiCall} from '../../mealAPI.js';
import DropdownSearch from '../../components/DropdownSelection/DropdownSelection.component';
import Subsection from '../Subsection/Subsection.container';
import MealTags from '../../assets/data/MealDBid-tag.json';
import styled, {withTheme} from 'styled-components';

const options = ['Category','Ingredients','Name','Area'];
  
const searchOptions = { 'Name':'https://www.themealdb.com/api/json/v1/1/search.php?s=',
                         'Category':'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
                         'Area':'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
                         'Ingredients':'https://www.themealdb.com/api/json/v1/1/filter.php?i='}; 

const categories = ['Breakfast','Starters','Sides','Mains','Desserts','Vegetarian','Miscellaneous']; 

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            option:'Category',
            endpoint:'',
            isLoaded:null,
            menuItems:[],
            input:null,
            mealCatMap:null,
            filteredRecipes:null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setOption = this.setOption.bind(this);
        this.postSelectedHandler = this.postSelectedHandler.bind(this);
        this.wrapper = React.createRef();
    }

    async componentDidMount(){
        try {
            const myResp = await apiCall('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
            let catMap = await this.jsonToDict(MealTags);
            let filteredRecipes = await this.getFilteredRecipes(myResp.meals,catMap);
            this.setState({
                isLoaded:true,
                menuItems:myResp.meals,
                mealCatMap:catMap,
                filteredRecipes:filteredRecipes
            });

            if (myResp === null) this.setState({error:null}); 
            
        } catch(error) {
            this.setState({error:error});
        }
    }

    async componentDidUpdate(prevProps, prevState) {    
        // console.log( 'Current endpoint', this.state.endpoint, 'Prev', prevState.endpoint);
        if(this.state.enterClicked && (this.state.endpoint !== prevState.endpoint)){
            try {
                const myResp = await apiCall(this.state.endpoint);
                let catMap = await this.jsonToDict(MealTags);
                let filteredRecipes = await this.getFilteredRecipes(myResp.meals,catMap);
                this.setState({
                    isLoaded:true,
                    menuItems:myResp.meals,
                    enterClicked:false,
                    mealCatMap:catMap,
                    filteredRecipes:filteredRecipes
                });
                if (myResp === null) this.setState({error:null}); 
                
            } catch(error) {
                this.setState({error:error, menuItems:null});
            }
        }
        
     }

    componentWillUnmount () {
        this.setState({isLoaded:null});
    }

    setOption = (type) => {
        this.setState({option:type});
    }

    // Update new input and fetch new data
    handleChange = (event) => {
        this.setState({input:event.target.value});
        event.preventDefault();
    }
    //set new endpoint state once the user presses enter 
    handleClick = (event) => {
        let newendpoint = searchOptions[this.state.option] + this.state.input;
        this.setState({enterClicked:true, endpoint:newendpoint});
        event.preventDefault();
    }

    //Set up the new selected meal id
    postSelectedHandler = (id) => {
        this.props.history.push({pathname:'/' + id});
        // this.setState({mealId:id});
    }

    jsonToDict = (mealtags) => {
        let result = {};
        mealtags.forEach((a) => {
            let temp = a.tags.split(',').sort();
            let newCategory = '';
            if (temp.indexOf('Breakfast') !== -1|| temp.indexOf('Brunch') !== -1){
                newCategory = 'Breakfast';
            }else if(temp.indexOf('Starter') !== -1 || temp.indexOf('Soup') !== -1){
                newCategory = 'Starters';
            }else if(temp.indexOf('Sidedish') !== -1){
                newCategory = 'Sides';
            }else if(temp.indexOf('Vegetarian') !== -1 || temp.indexOf('Vegan') !== -1){
                newCategory = 'Vegetarian';
            }else if(temp.indexOf('Mainmeal') !== -1){
                newCategory = 'Mains';
            }else if(temp.indexOf('Tart') !== -1 || temp.indexOf('Fruity') !==-1 || temp.indexOf('Desert') !== -1 || temp.indexOf('Pudding')!== -1){
                newCategory = 'Desserts';
            }else{
                newCategory = 'Miscellaneous';
            }
            result[a.id] = newCategory;
        });
        return result;
    }

    getFilteredRecipes = (menuItems,catMap) => {
        let filterRecipesByCat = {'Breakfast':[], 'Starters':[], 'Sides':[],'Mains':[],'Desserts':[], 'Vegetarian':[],'Miscellaneous':[]};

        menuItems.forEach((a) => {
            if(catMap[parseInt(a.idMeal)] !== undefined && filterRecipesByCat[catMap[parseInt(a.idMeal)]] !== undefined){
                filterRecipesByCat[catMap[parseInt(a.idMeal)]].push(a);
            }else filterRecipesByCat['Miscellaneous'].push(a);
        })
        return filterRecipesByCat;
    }

    render(){

        let Subsections = (<div>Your meal will be with you shortly.</div>);
        let currCategory = null;

        //Map the query data from the Api once it has loaded and save it into Meals
        //Display a there are no meals message when API returns null value

        if (this.state.menuItems === null  || this.state.error === null) Subsections = <div>Sorry, there are no meals with this search.</div>;
        else if (this.state.error) Subsections = (<div>There seems to be an error. </div>);
        else if(this.state.isLoaded === true) {
            Subsections = <div>
                            {categories.map((cat,inx) => {
                                currCategory =  (this.state.filteredRecipes[cat] !== undefined) ? this.state.filteredRecipes[cat]:[];
                                if (currCategory.length > 0){
                                    return (
                                        <Subsection
                                            key = {inx}
                                            subtitle = {cat}
                                            items = {currCategory}
                                            clicked = {this.postSelectedHandler} 
                                        />
                                    )
                                }
                            })}
                        </div>
            
        };
        return (<div ref={this.wrapper}>
                    <SearchContainer>
                        <SearchContents>
                            <SearchInput type='text' onChange={(event) => this.handleChange(event)}/>
                            <SearchButton alt='Search' value='Enter' onClick = {(event) => this.handleClick(event)}>
                                <SearchLabel>Search</SearchLabel>
                                {/* <SearchIcon src={searchIcon} alt='search logo'/>  */}
                            </SearchButton>
                                <DropdownSearch classes={categoryDropdownStyle} items={options} onClick={(type)=>this.setOption(type)} title={'Search By'}/>
    
                        </SearchContents>
                    </SearchContainer>
                    {Subsections}
               </div>)
    }
}
export default withTheme(Home);

const SearchContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    align-self:center;
    background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${SearchBackground});
    background-position: center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    height:30vh;
    margin-bottom: 5em;
`

const SearchContents = styled.div`
    display:flex;
    flex-direction: column;
    margin: 10vw 0;
    justify-content:center;
    align-items:center;
`

const DropdownWrapper = styled.div`
    display:inline-flex;
    justify-content:center;
    align-self:center;
    width:20vw;
`

const SearchInput = styled.input`
    width: 30vw;
    height: 30px;
    border-style: none;
    box-shadow: none;
    border-radius: 5px;
    padding: 5px;
`

const SearchButton = styled.button`
    display: inline-flex;
    justify-content:center;
    align-items:center;
    margin: 30px 0;
    width:15vw;
    height:50px;
    border-style: none;
    box-shadow: none;
    border-radius: 5px;
    background: #C60000;
`

const SearchLabel = styled.span`
    font-size:26px;
    font-weight:bold;
    color:#FFF
`

const SearchIcon = styled.img`
    padding:10px;
    height:20px;
`
const categoryDropdownStyle = {
    root: {
      background: '#8e8e8e',
      borderRadius:'5px',
      width:'120px',
      height:'50px',
      display:'flex',
      justifyContent:'center'
    }};


const testWrapper = styled.div`
    background-color:red;
`

