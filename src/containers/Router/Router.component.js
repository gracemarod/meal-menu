import React, {Component} from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
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
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/' exact component={Home}/>
                </Switch>
            </div>
        )
    }

}

export default Router;