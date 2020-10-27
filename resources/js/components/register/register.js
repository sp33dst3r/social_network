import React, { Component } from "react";

import withAuthService from '../../hoc/withAuthservice'
import {formSubmitter} from '../../actions/user_actions'
import {connect} from 'react-redux';
import { saveUserToStorage } from "../../utils/user";
class Register extends Component {

    constructor(){


        super();
       // console.log(props, "PROPS");
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){

        console.log(this.props.submitted, 'submitted');

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
        userService.register(user).then( (response) => {
            saveUserToStorage(response)
            this.props.formSubmitter(false)
            console.log(response, "SUCCESS_SERVICE");
            this.props.toggleAuthModal(false);
        })
        .catch( (error) => {
            this.props.formSubmitter(false)
            console.log(error, "ERROR_SERVICE");
        });
    }

    render(){
        const { user } = this.state;
        return (
           <div>
               <form method="POST" action="" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                        <div className="col-md-6">
                            <input id="name" onChange={this.handleChange} type="text" className="form-control" name="name" value={user.name}  />


                            <span className="invalid-feedback" role="alert">
                                <strong>test</strong>
                            </span>

                        </div>
                    </div>

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

                    <div className="form-group row">
                        <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                        <div className="col-md-6">
                            <input id="password-confirm" type="password" onChange={this.handleChange} className="form-control" name="password_confirmation" value={user.password_confirmation}  />
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div className="col-md-6 offset-md-4">
                            <button type="submit" disabled={this.props.submitted} className={'btn btn-primary ' + this.props.submitted}>
                                Register
                            </button>
                        </div>
                    </div>
                </form>
           </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log(state, "mapStateToProps");

    return {
        submitted: state.userReducer.submitted
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        formSubmitter: (sbm) => {
            dispatch(formSubmitter(sbm))
        }
    }
}
export default withAuthService()(connect(mapStateToProps, mapDispatchToProps)(Register));
