import React from 'react';
import Search from '../Search/Search.component';
import './Searches.css'
import searchIcon from '../assets/images/search.png';
import MealBox from '../MealBox/MealBox.component';

class Searches extends React.Component{          

    constructor(props){
        super(props);
        this.state = {
            input:'',
            link:'',
            enterClicked: false, 
            isLoaded:null,
            menuItems:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    

    componentDidMount(){
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded:true,
                    menuItems:result.meals
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        )
    }

    // Update new input and fetch new data
    handleChange = (event, link) => {
        let newInput = link + event.target.value;
        this.setState({input:newInput});
    }
    //set new link state once the user presses enter 
    handleClick = (event) => {
        let newLink = this.state.input;
        this.setState({enterClicked:true, link:newLink});
        event.preventDefault();
    }

    //if there's a new input, fetch the data with the new link
    componentDidUpdate(prevProps, prevState) {    
        if(this.state.enterClicked && (this.state.link !== prevState.link)){
            fetch(this.state.link)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded:true,
                        menuItems:result.meals,
                        enterClicked:false
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
            
        }
        
     }

    render(){
        const  searchOptions = [ {type:'Name', link:'https://www.themealdb.com/api/json/v1/1/search.php?s='},
                                 {type:'Category',   link:'https://www.themealdb.com/api/json/v1/1/filter.php?c='},
                                 {type:'Area',       link:'https://www.themealdb.com/api/json/v1/1/filter.php?a='},
                                 {type:'Ingredient', link:'https://www.themealdb.com/api/json/v1/1/filter.php?i='}];    
        
        //Map the query data from the Api once it has loaded and save it into MealsGrid
        //Display a there are no meals message when API returns null value
        let MealsList = null;
        if (this.state.error) MealsList = (<div>Error: {this.state.error.message} </div>);
        else if (this.state.menuItems === null) MealsList = (<div>Sorry, there are no meals with this input.</div>);
        else if(this.state.isLoaded === true) {
            MealsList = (
            <div className='MealsContainer'>
                {this.state.menuItems.map((meal) => {
                    return <MealBox
                        image = {meal.strMealThumb}
                        name = {meal.strMeal}
                        key = {meal.idMeal}
                    />
                })}
            </div>
            );
        }
        
        return <div className='MealMenuContainer'>
                    <div>
                        <div className='SearchesContainer'>
                            {searchOptions.map((item,inx) => {
                                return <Search
                                    onChange = {(event) => this.handleChange(event,item.link)}
                                    type = {item.type}
                                    link = {item.link}
                                    isLoaded = {item.isLoaded}
                                    key = {inx}
                                />
                            })}
                        </div>
                        <div className='SearchIconContainer'> 
                            <button value='Enter' onClick = {(event) => this.handleClick(event)}>
                                <img src={searchIcon} alt='search logo'/> 
                            </button>
                        </div>
                    </div>
                    {MealsList}

            </div>
    }
}
export default Searches;