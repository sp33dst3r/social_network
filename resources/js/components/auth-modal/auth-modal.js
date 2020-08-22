import React, { Component } from "react";
import './custom-modal.css'
import Login from '../login/login';
import Register from '../register/register';
class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 'auth'
        }
    }

    render(){
        const { toggleAuthModal } = this.props;
        let {show} = this.state;
        return(
            <div className='custom-modal'>
                {this.props.children}
                <div className="modal-header">
                    <a className="modal-title" onClick={
                        () => {
                            this.setState((state)=>{
                                return{
                                    show: 'auth'
                                }
                            })
                        }
                    }>Login</a>
                    <a className="modal-title" onClick={()=>{
                        this.setState((state)=>{
                            return{
                                show: 'register'
                            }
                        })
                    }}>Register</a>
                </div>
                {show == 'auth' ? <Login toggleAuthModal={toggleAuthModal} /> : <Register toggleAuthModal={toggleAuthModal} /> }


            </div>
        )
    }

}

export default Modal;
