import React, { Component } from "react";
import {connect} from 'react-redux';
import withAuthService from '../../hoc/withAuthservice'
import {formSubmitter, userDataReceiver, isAuthorised} from '../../actions/user_actions'
import { saveUserToStorage } from "../../utils/user";
class Login extends Component  {

    constructor(){


        super();
       // console.log(props, "PROPS");
        this.state = {
            user: {
                email: '',
                password: '',
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {

        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit(event){
        event.preventDefault();

        const { user } = this.state;
        const  {userService}  = this.props;
        this.props.formSubmitter(true);
        userService.login(user).then( (response) => {
            saveUserToStorage(response)
            this.props.formSubmitter(false);
            this.props.userDataReceiver(response.data);
            this.props.isAuthorised(true);
            console.log(response, "SUCCESS_SERVICE");
            this.props.toggleAuthModal(false);
        })
        .catch( (error) => {
            this.props.formSubmitter(false)
            this.props.isAuthorised(false);

            console.log(error, "ERROR_SERVICE");
        });
    }
        render(){

            const { user } = this.state;
            return (
            <div>
               <form method="POST" action="" onSubmit={this.handleSubmit}>

                    <div className="form-group row">
                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email</label>

                        <div className="col-md-6">
                            <input id="email" type="email" onChange={this.handleChange} className="form-control" name="email" value={user.email}  />


                                <span className="invalid-feedback" role="alert">
                                    <strong>test</strong>
                                </span>

                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                        <div className="col-md-6">
                            <input id="password" type="password" onChange={this.handleChange} className="form-control" name="password" value={user.password}  />


                            <span className="invalid-feedback" role="alert">
                                <strong>test</strong>
                            </span>

                        </div>
                    </div>



                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-4">
                            <button type="submit" disabled={this.props.submitted} className={'btn btn-primary ' + this.props.submitted}>
                                Login
                            </button>
                        </div>
                    </div>
                </form>
           </div>
           )
        }

}
const mapStateToProps = (state) => {
    return {
        submitted: state.userReducer.submitted,
        userData: {
            access_token: state.userReducer.access_token,
            refresh_token: state.userReducer.refresh_token,
            expires_in: state.userReducer.expires_in,
            user_id: state.userReducer.user_id
        }
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        formSubmitter: (sbm) => {
            dispatch(formSubmitter(sbm))
        },
        userDataReceiver: (userData) => {
            dispatch(userDataReceiver(userData))
        },
        isAuthorised: (data) => {
            dispatch(isAuthorised(data))
        }
    }
}
export default withAuthService()(
    connect(mapStateToProps, mapDispatchToProps)(Login)
);
