import React from 'react';
import './Home.css';
import searchIcon from '../../assets/images/search.png';
import {apiCall} from '../../mealAPI.js';
import DropdownSearch from '../../components/DropdownSelection/DropdownSelection.component';
import Subsection from '../Subsection/Subsection.container';
import MealTags from '../../assets/data/MealDBid-tag.json';
import {withTheme} from '@material-ui/core/styles';

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
            link:'',
            isLoaded:null,
            menuItems:[],
            input:null,
            mealId:null,
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

    async componentDidUpdate(prevState) {    
        if(this.state.enterClicked && (this.state.link !== prevState.link)){
            try {
                const myResp = await apiCall(this.state.link);
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
                this.setState({error:error});
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
    }
    //set new link state once the user presses enter 
    handleClick = (event) => {
        let newLink = searchOptions[this.state.option] + this.state.input;
        this.setState({enterClicked:true, link:newLink});
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

    getTheme = (props) =>{
        // console.log('Props', props.theme);
        return <span>{props.theme.palette.type}</span>;
    }

    render(){

        let Subsections = (<div>Your meal will be with you shortly.</div>);
        let currCategory = null;

        let newTheme = withTheme(this.getTheme);
        // console.log('THEME', newTheme);
        //Map the query data from the Api once it has loaded and save it into Meals
        //Display a there are no meals message when API returns null value
        if (this.state.error) Subsections = (<div>Error: {this.state.error.message} </div>);
        else if (this.state.menuItems === null) return <div>Sorry, there are no meals with this result.</div>;
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
                    <DropdownSearch items={options} onClick={(type)=>this.setOption(type)} title={'Search By'}/>
                    <input type='text' onChange={(event) => this.handleChange(event)}/>
                    <div className='SearchIconContainer'> 
                        <button value='Enter' onClick = {(event) => this.handleClick(event)}>
                            <img src={searchIcon} alt='search logo'/> 
                        </button>
                    </div>
                    {Subsections}
                    {/* {newTheme} */}
               </div>)
    }
    
}
export default Home;
