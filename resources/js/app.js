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
import Profile from './components/profile/profile'
import Nav from './components/nav/nav';
import Modal from './components/auth-modal/auth-modal';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './store'
import {Route, Switch} from 'react-router-dom';
import {UserProvider, UserConsumer} from './withuser-service/withuser-service'
import {TranslationProvider, TranslationConsumer} from './with-translation/with-translation'
import {UserService} from './services/auth.service'
import {Translate} from './services/translate.service'
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://soc.loc/";

import Messages from './components/messages/messages';
import Lessons from './components/lessons/lessons';
import SearchFriends from './components/search-friends/search-friends';
import Settings from './components/settings/settings';

axios.interceptors.request.use((config) => {
    console.log(config, "before");
    //const token = store.getState().session.token;
    const token = localStorage.getItem("access_token");
    config.headers.Authorization =  "Bearer "+token;
    return config;
});

 axios.interceptors.response.use(
    response => {
      console.log("log");
      return response;
    },

    error => {
      console.log(error, "interceptor error");
      const originalRequest = error.config;
      console.log(originalRequest, "originalRequest");


      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      const tokens = {
        access_token: localStorage.getItem("access_token"),
        refresh_token: localStorage.getItem("refresh_token")
      };


      return axios
        .post(`api/refresh`, tokens)
        .then(response => {

            console.log(response, "resp");
            const access = response.data.token;
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);


          axios.defaults.headers.common["Authorization"] = `Bearer ${
            response.data.token
          }`;
          error.config.headers.Authorization = 'Bearer '+ localStorage.getItem("access_token")
          console.log(error.config, "");

          error.hasRefreshedToken = true;

          if (response.status === 200) {
              return axios.request(error.config)
          }

         return Promise.reject(tokenError);
        })
        //return Promise.reject(tokenError);
        /* .catch(() => {
          const tokenError = new Error("Cannot refresh token");
          tokenError.originalError = error;
          return Promise.reject(tokenError);
        }); */
    }
  );




const userService = new UserService();
const translator = new Translate();


class App extends Component{
    constructor(){
        super();
        this.state = {
            authModalOpened: true
        }
    }
    toggleAuthModal(param = undefined){
        this.setState((state)=>{
            return {
                authModalOpened: (typeof param == 'undefined') ? !state.authModalOpened : param
            }
        })

    }
    render(){
        const { authModalOpened } = this.state;
        return (
            <div className="wrapper">
                <Nav toggleAuthModal = {()=>{
                    this.toggleAuthModal();
                }} />
                 <Switch>

                    {/* <Route path="/" component={Register} exact /> */}
                    <Route path="/profile/" component={Profile} exact />
                    <Route path="/profile/:id/messages/" component={Messages} exact />
                    <Route path="/lessons/" component={Lessons} exact />
                    <Route path="/search-friends/" component={SearchFriends} exact />
                    <Route path="/profile/:id/settings/" component={Settings} exact />
                </Switch>
                <main>
                    {
                        authModalOpened && <Modal toggleAuthModal = {()=>{
                            this.toggleAuthModal();
                        }} >
                        <h1>Auth</h1>


                    </Modal>
                    }

                    {/* {ReactDOM.createPortal(
                        <h1>Portal</h1>,
                        document.getElementById('portal')
                    )} */}
                </main>
            </div>

        )
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={store}>
            <TranslationProvider value={translator}>
                <UserProvider value={userService}>
                    <Router>
                        <App />
                    </Router>
                </UserProvider>
            </TranslationProvider>
         </Provider>
    , document.getElementById('app'));
}
