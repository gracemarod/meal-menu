import React from 'react';
import MealBox from '../MealBox/MealBox.component';
import './Meals.css';

class Meals extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search_input:'',
            input:'',
            link:'',
            enterClicked: false, 
            isLoaded:null,
            selectedMealId: null,
            menuItems:[]
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        console.log('salmon', this.state);
        // fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //         this.setState({
        //             isLoaded:true,
        //             menuItems:result.meals
        //         });
        //     },
        //     (error) => {
        //         this.setState({
        //             error
        //         });
        //     }
        // )
    }
    componentDidUpdate(){
        // if(!this.state.loadedMenu || (this.state.loadedMenu && this.state.loadedMenu.link !== this.props.link)){
            // console.log( "Prev", this.props );
    }

    render() {
        const {error, isLoaded, items} =  this.state;
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


export default Meals;