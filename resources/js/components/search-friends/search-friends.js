import React, {Component} from 'react';
import './friends.css'
import { withTranslation } from 'react-i18next';
import {connect} from 'react-redux';

import withAuthService from '../../hoc/withAuthservice'
class SearchFriends extends Component {
    constructor(props){
        super(props);
        const { t } = this.props;
        console.log(t("beginner"), "TT");
        this.state = {
            userSearch: {
                gender: '',
                level: [
                   /// {t('simpleContent')},

                ],
                password: '',
                password_confirmation: ''
            }
        }

        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }
    handleClick(event){
        window.setTimeout(
            function (){
                console.log("searching...");
            }, 1000
        );
    }
    onChangeValue(){

    }
    render(){
        
        return (
            <form>
            <div onChange={this.onChangeValue}>
                <input name="gender" value="male" />
                <input name="gender" value="female" />
            </div>
            
            <input onKeyPress={this.handleClick} className="search-input" />
        </form>
        )
        
    }
}
const mapStateToProps = (state) => {

    return {
        searchRequest: state.userReducer.searchRequest
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        search: (sbm) => {
            dispatch(search(sbm))
        }
    }
}
export default withTranslation()(withAuthService()(connect(mapStateToProps, mapDispatchToProps)(SearchFriends)));
