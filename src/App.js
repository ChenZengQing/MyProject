/* eslint-disable jsx-a11y/aria-role */
import React, {Component} from 'react';
import './App.css';

import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import HomePage from "./pages/HomePage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={hashHistory}>
                    <Route path="/">
                        <IndexRoute component={HomePage}/>
                        <Route path="/homepage" component={HomePage}/>
                    </Route>
                </Router>
            </div>
        );
    }
}
export default App;
