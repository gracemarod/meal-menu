import React, {Component} from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
import Home from '../Home/Home.component'; 
import './Router.css';
import Recipe from '../../components/Recipe/Recipe.Component';

class Router extends Component{
    render(){
        return (
            <div className='Home'>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to='/Home' exact>Home</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/Home' exact component={Home}/>
                    <Route path='/:id' exact component={Recipe}/>
                </Switch>
              
            </div>
        )
    }

}

export default Router;