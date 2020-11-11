import React, {Component} from 'react';
import './search.css'
import withAuthService from '../../hoc/withAuthservice'
class SearchMyFriends extends Component {
    handleClick(event){
        window.setTimeout(
            function (){
                console.log("searching...");
            }, 1000
        );
    }
    render(){
        <form>
            <input onKeyPress={this.handleClick} class="search-input" />
        </form>
    }
}
export default withAuthService()(SearchMyFriends);
