/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/login');
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store'
import {Route, Switch} from 'react-router-dom';
import {UserProvider, UserConsumer} from './withuser-service/withuser-service'
import {UserService} from './services/auth.service'
import { Provider } from "react-redux";
const userService = new UserService();


class App extends Component{
    render(){
        return (
            <Switch>

                <Route path="/" component={Register} exact />
                <Route path="/login" component={Login} exact />
            </Switch>

        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <UserProvider value={userService}>
                <Router>
                    <App />
                </Router>
            </UserProvider>
         </Provider>
    , document.getElementById('app'));
}
