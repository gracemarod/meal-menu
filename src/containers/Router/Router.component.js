import React from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
import Home from '../Home/Home.component'; 
import Recipe from '../../components/Recipe/Recipe.Component';
import DropdownSelection from '../../components/DropdownSelection/DropdownSelection.component';
import styled, {withTheme} from 'styled-components';


const themes = ['Dark', 'Light'];

const Router = (props) => {
    
    const setOption = (type)=> {
        props.onClick(type);
    }
    console.log('Props in Router', props.theme.main);
    let Header = (props.theme.main === 'dark') ? HeaderDark : HeaderLight;
    return (
        <div className='Router'>
            <Header>
                <Nav>
                    <ul>
                        <li>
                            <NavLink to='/' exact>Home</NavLink>
                        </li>
                    </ul>
                </Nav>
                <Dropdown>
                    <DropdownSelection items={themes} onClick={(type)=>setOption(type)} title={'Select Theme'} />
                </Dropdown>
            </Header>
            <Route path='/' exact component={Home}/>
            <Switch>
                <Route path='/:id' exact component={Recipe}/>
            </Switch>
        </div>)

}

const Nav = styled.nav`
    display:flex;
    flex-grow:1;
`;

const HeaderDark = styled.header`
    background:#1B5100;
`;

const HeaderLight = styled.header`
    background:#CE834A;
`;

const Dropdown = styled.div`
    justify-content: flex-end;
    flex-grow: 0;
    max-width:20vw;
`;

export default withTheme(Router);