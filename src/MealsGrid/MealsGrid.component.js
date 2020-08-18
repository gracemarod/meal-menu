import React from 'react';
import MealBox from '../MealBox/MealBox.component';
import './MealsGrid.css';

class MealsGrid extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items:[]
        }
    };

    componentDidMount(){
        fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded:true,
                        items:result.meals
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

    render() {
        const {error, isLoaded, items} =  this.state;
        console.log('Items:', items);
        if (error){
            return <div>Error: {error.message}</div>
        }else if(!isLoaded){
            return <div>Loading...</div>
        }else{
            return <div className='MealsContainer'>
                {items.map((item,inx) => {
                    return <MealBox
                        image = {item.strMealThumb}
                        name = {item.strMeal}
                        key = {item.idMeal}
                    />
                })}
            </div>
         
        }
    }
}
export default MealsGrid;