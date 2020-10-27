import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {connect} from 'react-redux'
import withAuthService from '../../hoc/withAuthservice'
class Profile extends Component{
    componentDidMount(){
        console.log("mounted");
        const  {userService}  = this.props;
        userService.getUser().then( (response) => {
            console.log("DDDD");
            console.log(response, 'response!');
            /* saveUserToStorage(response)
            this.props.formSubmitter(false);
            this.props.userDataReceiver(response.data);
            this.props.isAuthorised(true);
            console.log(response, "SUCCESS_SERVICE");
            this.props.toggleAuthModal(false); */
        })
        .catch( (error) => {
            console.log(error, 'profile error!!!');

        });
    }
    render(){
        return(
            'profile'
        )
    }
}

const mapStateToProps = (state) => {
    return{
        userData: {
            user_id: state.userReducer.user_id
        }
    }
}


export default withAuthService()(connect()(Profile));
