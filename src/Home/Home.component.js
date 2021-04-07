import React, {Component} from 'react';
import { Route, Link, NavLink, Switch} from 'react-router-dom';
import Searches from '../Searches/Searches.component';

class Home extends Component{
    render(){
        return (
        
            <div>
                <header>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Home</Link>
                            </li>
                            <li>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Route path='/' exact component={Searches}/>
            </div>
        )
    }

}

export default Home;