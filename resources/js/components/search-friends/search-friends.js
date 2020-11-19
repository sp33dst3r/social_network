import React, {Component} from 'react';
import './friends.css'
import {connect} from 'react-redux';
 import TranslationContext from '../../with-translation/with-translation'


import withAuthService from '../../hoc/withAuthservice'
class SearchFriends extends Component {


    constructor(props){

        super(props);

       /*  console.log(translator, "aaa");
        console.log(messages, "messages"); */
        this.state = {
            userSearch: {
                gender: '',
                levels: ["beginner"],
                discipline: [],
            }
        }
        console.log(this.state, 'ssssss');
        /* this.setState(prevState => ({
            userSearch: {                   // object that we want to update
                ...prevState.userSearch,    // keep all other key-value pairs
                levels: messages       // update the value of specific key
            }
        })) */
       /*  this.setState(userSearch.levels, messages)
        console.log(SearchFriends.context, "TranslationProvider"); */
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
        const {levels} = this.state.userSearch;
        const {language, translator, messages} = this.props;
        console.log(levels, "LEVELS");
        const levelValues = messages[language];
        return (

            <form>
            <select>
                {levels.map((key) => (
                    <option key={key}>{levelValues[key]}</option>
                ))}
            </select>
            <div onChange={this.onChangeValue}>
                <input name="gender" type="radio" value="male" />
                <input name="gender" type="radio" value="female" />
            </div>

            <input onKeyPress={this.handleClick} className="search-input" />
        </form>
        )

    }
}
SearchFriends.contextType = TranslationContext;
//SearchFriends.contextType = TranslationProvider;
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
export default withAuthService()(connect(mapStateToProps, mapDispatchToProps)(SearchFriends));
