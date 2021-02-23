import React from 'react';
import Search from '../Search/Search.component';
import './Searches.css'
import searchIcon from '../assets/images/search.png';
import MealBox from '../MealBox/MealBox.component';
import MealsGrid from '../MealsGrid/MealsGrid.component';


class Searches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            link:'',
            enterPressed: false, 
            inputs:[ {type:'Name',       link:'https://www.themealdb.com/api/json/v1/1/search.php?s=', isLoaded: false, error: null},
                     {type:'Category',   link:'https://www.themealdb.com/api/json/v1/1/search.php?c=', isLoaded: false, error: null},
                     {type:'Area',       link:'https://www.themealdb.com/api/json/v1/1/search.php?a=', isLoaded: false, error: null},
                     {type:'Ingredient', link:'https://www.themealdb.com/api/json/v1/1/search.php?i=', isLoaded: false, error: null}
                    ],
            isLoaded:null,
            menuItems:[]
        }
        this.handleChange = this.handleChange.bind(this);
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
                    isLoaded:true,
                    error
                });
            }
        )
    }

    // Update new input and fetch new data
    handleChange = (event,type,link, inx) => {
        let newLink = link + event.target.value;
        this.setState({enterPressed:true, link:newLink});
        event.preventDefault();
        console.log(this.state.enterPressed, this.state.link)
    }

    updateState = (newLink) => {
        console.log(newLink)
        this.setState({link:newLink})
        console.log('New Link', this.state.link);
    }
    // componentDidUpdate(prevProps, prevState) {
        
    //     if(this.state.isLoaded && this.state.link !== prevState.link){
    //         fetch(this.state.link)
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded:true,
    //                     menuItems:result.meals
    //                 });
    //             },
    //             (error) => {
    //                 this.setState({
    //                     isLoaded:true,
    //                     error
    //                 });
    //             }
    //         )
    //     }
    //  }

    render(){

        const {error} = this.state.menuItems;
        
        //Map the query data from the Api once it has loaded and save it into MealsGrid
        let MealsList = null;
        if (error) MealsList = (<div>Error: {error.message} </div>);
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
        
    
        return <div>
                    <div className='SearchesContainer'>
                    {this.state.inputs.map((item,inx) => {
                        return <Search
                            onChange = {(event) => this.handleChange(event,item.type,item.link,inx)}
                            type = {item.type}
                            link = {item.link}
                            isLoaded = {item.isLoaded}
                            key = {inx}
                        />
                    })}
                    <div className='SearchIconContainer'> 
                        <button>
                            <img src={searchIcon} alt='search logo'/> 
                        </button>
                    </div>
                </div>
                {MealsList}
                <div><h1>NEW MEAL MENU</h1>
                    <MealsGrid url={this.state.link} />
                </div>
            </div>
    }
}
export default Searches;