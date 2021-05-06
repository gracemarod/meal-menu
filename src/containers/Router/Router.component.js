import React,{useState} from 'react';
import { Route, NavLink, Switch} from 'react-router-dom';
import Home from '../Home/Home.component'; 
import Recipe from '../../components/Recipe/Recipe.Component';
import DropdownSelection from '../../components/DropdownSelection/DropdownSelection.component';
import styled from 'styled-components';


const themes = ['Dark', 'Light'];

const Router = (props) => {
    const [theme, setTheme] = useState(props.theme);

    const setOption = (type)=> {
        setTheme(type);
        props.onClick(type);
    }
    let Header = (theme === 'Dark') ?  HeaderDark : HeaderLight ;
    return (
        <RouterStyle>
            <Header>
                <Nav>
                    <HeaderUl>
                        <HeaderLi>
                            <NavLink to='/' exact>Home</NavLink>
                        </HeaderLi>
                    </HeaderUl>
                </Nav>
                <Dropdown>
                    <DropdownSelection classes={themeDropdownStyle} items={themes} onClick={(type)=>setOption(type)} title={'Select Theme'} />
                </Dropdown>
            </Header>
            <Route path='/' exact component={Home}/>
            <Switch>
                <Route path='/:id' exact component={Recipe}/>
            </Switch>
        </RouterStyle>)

}

export default Router;

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

const themeDropdownStyle = {
    root: {}
}

const RouterStyle = styled.div`
    a{
        text-decoration: none;
        font-size:24px;
    },
    a:hover, &a::active{

    },
    a:visited{
        color:inherit;
    }
`
const HeaderLi = styled.li`
    color:white;
    margin: 20px;
    align-self:center;
`

const HeaderUl = styled.ul`
    display:flex;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    color: ${({ theme }) => theme.text};
`