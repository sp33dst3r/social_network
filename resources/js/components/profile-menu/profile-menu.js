import react, {Component} from 'react'

class ProfileMenu extends Component {
    constructor(){
        super();
    }
    render(){
        return (
            <React.Fragment>
                <ul>
                    <li>
                        <Link to={"/profile/"+user_id+"/settings"}>Settings</Link>
                    </li>
                    <li>
                        <Link to={"/profile/"+user_id+"/lessons"}>Lessons</Link>
                    </li>
                    <li>
                        <Link to={"/profile/"+user_id+"/messages"}>Messages</Link>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}
