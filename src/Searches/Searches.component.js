import React from 'react';
import Search from '../Search/Search.component';
import './Searches.css'
import searchIcon from '../assets/images/search.png';
import MealBox from '../MealBox/MealBox.component';

class Searches extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            link:'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
            keyPressed: false, 
            inputs:[ {type:'Name',       link:'https://www.themealdb.com/api/json/v1/1/search.php?s=', isLoaded: false, error: null},
                     {type:'Category',   link:'https://www.themealdb.com/api/json/v1/1/search.php?c=', isLoaded: false, error: null},
                     {type:'Area',       link:'https://www.themealdb.com/api/json/v1/1/search.php?a=', isLoaded: false, error: null},
                     {type:'Ingredient', link:'https://www.themealdb.com/api/json/v1/1/search.php?i=', isLoaded: false, error: null}
                    ],
            isLoaded:false,
            menuItems:[]
        }
        this.onEnter = this.onEnter.bind(this);
    }
    
    // Update new input and fetch new data
    onEnter = (event,type,link,inx) => {
        if(event.key === 'Enter'){

            const newLink = link + event.target.value;
            this.setState({ link:newLink});
            console.log('Event', this.state.link);
            
        }
    }

    componentDidMount(){
        fetch(this.state.link)
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

/*    componentDidUpdate(prevProps) {
        // if(this.state.keyPressed){
            
            fetch(this.state.link)
            .then(res => {
                // console.log('Res', res.url);
                return res.json()})
            .then(
                // (result) => {
                //     this.setState({
                //         isLoaded:true,
                //         menuItems:result.meals
                //     });
                // },
                (error) => {
                    this.setState({
                        isLoaded:true,
                        error
                    });
                }
            )
        // }
    }*/

    render(){

        const {error} = this.state.menuItems;
        console.log(this.state.menuItems, this.state.isLoaded, this.state.error)
        
        //Map the query data from the Api once it has loaded and save it into MealsGrid
        let MealsGrid = null;
        if (this.state.error) MealsGrid = (<div>Error: {error.message} </div>);
        else if(this.state.isLoaded === true) {
            MealsGrid = (
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
                            keyDown = {(event) => this.onEnter(event,item.type,item.link,inx)}
                            type = {item.type}
                            link = {item.link}
                            isLoaded = {item.isLoaded}
                            error = {item.error}
                            key = {inx}
                        />
                    })}
                    <div className='SearchIconContainer'> 
                        <button>
                            <img src={searchIcon} alt='search logo'/> 
                        </button>
                    </div>
                </div>
                {MealsGrid}
            </div>
    }
}
export default Searches;