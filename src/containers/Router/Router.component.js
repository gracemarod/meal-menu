import React, {Component} from 'react';
import { Route, NavLink} from 'react-router-dom';
import Home from '../Home/Home.component'; 
import './Router.css';

class Router extends Component{
    render(){
        return (
            <div className='Home'>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to='/' exact>Home</NavLink>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Route path='/' exact component={Home}/>
              
            </div>
        )
    }

}

export default Router;