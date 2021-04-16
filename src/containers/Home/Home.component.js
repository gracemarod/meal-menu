import React from 'react';
import './Home.css';
import searchIcon from '../../assets/images/search.png';
import MealBox from '../../components/MealBox/MealBox.component';
import {apiCall} from '../../mealAPI.js';
import DropdownSearch from '../Searches/Searches.component';
import {Route, Switch} from 'react-router-dom';
import Recipe from '../../components/Recipe/Recipe.Component';


const  searchOptions = { 'Name':'https://www.themealdb.com/api/json/v1/1/search.php?s=',
                         'Category':'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
                         'Area':'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
                         'Ingredients':'https://www.themealdb.com/api/json/v1/1/filter.php?i='}; 

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            option:'Category',
            link:'',
            isLoaded:null,
            menuItems:[],
            input:'',
            mealId:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setOption = this.setOption.bind(this);
        this.postSelectedHandler = this.postSelectedHandler.bind(this);
    }

    async componentDidMount(){
        try {
            const myResp = await apiCall('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood');
            this.setState({
                isLoaded:true,
                menuItems:myResp.meals
            });
            if (myResp === null) this.setState({error:null}); 
            
        } catch(error) {
            this.setState({error:error});
        }
    }

    async componentDidUpdate(prevProps, prevState) {    
        if(this.state.enterClicked && (this.state.link !== prevState.link)){
            try {
                const myResp = await apiCall(this.state.link);
                this.setState({
                    isLoaded:true,
                    menuItems:myResp.meals,
                    enterClicked:false
                });
                if (myResp === null) this.setState({error:null}); 
                
            } catch(error) {
                this.setState({error:error});
            }
        }
        
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
        console.log('Im clicked');
        console.log("History:", this.props.history);
        this.props.history.push({pathname:'/' + id});
        // this.setState({mealId:id});
    }

    render(){
        //Map the query data from the Api once it has loaded and save it into Meals
        //Display a there are no meals message when API returns null value
        let MealsList = null;
        if (this.state.error) MealsList = (<div>Error: {this.state.error.message} </div>);
        else if (this.state.menuItems === null) MealsList = (<div>Sorry, there are no meals with this input.</div>);
        else if(this.state.isLoaded === true) {
            MealsList = 
            <div className='MealsContainer'>
                {this.state.menuItems.map((meal) => {
                    return (
                        <MealBox
                            key = {meal.idMeal}
                            image = {meal.strMealThumb}
                            name = {meal.strMeal}
                            clicked={() => this.postSelectedHandler(meal.idMeal)}
                        />
   
                )})}
            </div>
            
        };

        return <div>
                    <DropdownSearch onClick={(type)=>this.setOption(type)} value={this.option}/>
                    <input type='text' onChange={(event) => this.handleChange(event)}/>
                    <div className='SearchIconContainer'> 
                        <button value='Enter' onClick = {(event) => this.handleClick(event)}>
                            <img src={searchIcon} alt='search logo'/> 
                        </button>
                    </div>
                    {MealsList}
                    <Switch>
                        <Route path='/:id' exact component={Recipe}/>
                    </Switch>
               </div>
    }
    
}
export default Home;
