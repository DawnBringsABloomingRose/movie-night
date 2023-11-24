import React from "react";
import { Link } from "react-router-dom";


class UserLink extends React.Component {

    render() {
        return <><Link to={'/profile/'+this.props.id}>{this.props.name}</Link></>
    }
}

export default UserLink;