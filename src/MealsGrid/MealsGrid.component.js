import React from 'react';
import MealBox from '../MealBox/MealBox.component';
import './MealsGrid.css';

class MealsGrid extends React.Component{
    state = {
        updatedItems:[],
        loadedMenu:null
    }

    componentDidUpdate(){
        // if(!this.state.loadedMenu || (this.state.loadedMenu && this.state.loadedMenu.link !== this.props.link)){
            console.log( "Prev", this.props );
            // fetch()
            // .then(res => res.json())
            // .then(
            //     (result) => {
            //         this.setState({
            //             loadedMenu:true,
            //             updatedItems:result.meals
            //         });
            //     },
            //     (error) => {
            //         this.setState({
            //             loadedMenu:true,
            //             error
            //         });
            //     }
            // )

        // }

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


export default MealsGrid;