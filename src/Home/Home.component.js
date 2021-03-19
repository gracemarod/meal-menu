import React, {Component} from 'react';

import { Route, NavLink, Switch} from 'react-router-dom';

export default function NestingExample() {

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to='/Home' exact activeClassName="my-active">Home</NavLink>
                        </li>
                        <li>
                        </li>
                    </ul>
                </nav>
            </header>
            {
                <Switch>

                </Switch>
            }
        </div>
    )
}