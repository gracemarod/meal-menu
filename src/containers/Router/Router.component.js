import React from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
import Home from '../Home/Home.component'; 
import './Router.css';
import Recipe from '../../components/Recipe/Recipe.Component';
import DropdownSelection from '../../components/DropdownSelection/DropdownSelection.component';
import { withTheme,ThemeProvider } from '@material-ui/core';


const themes = ['Dark','Light'];

const Router = (props) => {
    
    const setOption = (type)=> {
        props.onClick(type);
    }
    
    const getTheme = (props) =>{
        console.log('NEW Theme in router', props.theme.palette.type);
        return <span>{props.theme.palette.type}</span>;
    }
    let Test = withTheme(getTheme);
    // console.log('test', test);
    return (
        <div className='Router'>
            <header className='header'>
                <nav className='Nav-Link'>
                    <ul>
                        <li>
                            <NavLink to='/' exact>Home</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className='Dropdown-Selection'>
                    <DropdownSelection items={themes} onClick={(type)=>setOption(type)} title={'Select Theme'} />
                </div>
            </header>
            <Route path='/' exact component={Home}/>
            <Switch>
                <Route path='/:id' exact component={Recipe}/>
            </Switch>
        </div>)

}

export default Router;