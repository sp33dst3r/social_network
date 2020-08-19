import React, { Component } from "react";
import {connect} from 'react-redux';
import {userDataReceiver, isAuthorised} from '../../actions/user_actions'


class Logout extends Component{
    constructor(){
        super();
    }
    logout(){
        this.props.isAuthorised(false);
        this.props.userDataReceiver({
            "expires_in": '',
            "access_token": '',
            "refresh_token": ''
        });
        window.localStorage.removeItem("expires_in");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        this.props.toggleAuthModal(false)
    }
    render(){
        return (
            <a onClick={()=>{
                this.logout();
            }}>Logout</a>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userDataReceiver: (userData) => {
            dispatch(userDataReceiver(userData));
        },
        isAuthorised: (data)=>{
            dispatch(isAuthorised(data))
        }
    }

}

export default connect(null, mapDispatchToProps)(Logout);
