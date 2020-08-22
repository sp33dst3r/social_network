import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import  Logout  from "../logout/logout";
import {userDataReceiver, isAuthorised} from '../../actions/user_actions'
import { getUserFromStorage } from "../../utils/user";
class Nav extends Component{
    componentDidMount(){
        console.log('mounted');
        const {expires_in, access_token, refresh_token, user_id} = getUserFromStorage();
        if(access_token){
                this.props.userDataReceiver(
                {
                    "expires_in": expires_in,
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "user_id": user_id
                }
            )

            this.props.isAuthorised(true);
            this.props.toggleAuthModal(false);
        }
    }
    render(){
        console.log(this.props.userData, 'this.props.userData');

        const { authorized, toggleAuthModal } = this.props;
        const {user_id} = this.props.userData;
        console.log(user_id, "id");




        const navPart = authorized == false ?
        <a onClick={toggleAuthModal}>Sign In / SignUp</a>
        :<React.Fragment>
        <Link to={"/profile/"+user_id+"/"}>Profile</Link><Logout  toggleAuthModal={toggleAuthModal} />
        </React.Fragment>
        return(

            <div className="nav">
                <nav>
                    <Link to={"/"}>Home</Link>
                    {navPart}
                </nav>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        authorized: state.userReducer.authorized,
        userData: state.userReducer.userData
    };
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
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
