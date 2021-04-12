import React, {Component} from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
import Searches from '../Searches/Searches.component';
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
                    <Route path='/' exact component={Searches}/>
                </Switch>
            </div>
        )
    }

}

export default Router;