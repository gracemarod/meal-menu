import React from 'react';
import './Home.css';
import searchIcon from '../../assets/images/search.png';
import MealBox from '../../components/MealBox/MealBox.component';
import Meals from '../../components/Meals/Meals.component';
import {apiCall} from '../../mealAPI.js';
import DropdownSearch from '../Searches/Searches.component';
import Searches from '../Searches/Searches_old.component';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType:'Ingredients',
            link:'',
            isLoaded:null,
            menuItems:[],
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleClick = this.handleClick.bind(this);
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
    setOptionType = (type) => {
        this.setState({searchType:type});
    }

    render(){
        return <div>
                    {/* <Searches/> */}
                    <DropdownSearch onClick={(type)=>this.setOptionType(type)} value={this.searchType}/>
               </div>
    }
    
}
export default Home;
