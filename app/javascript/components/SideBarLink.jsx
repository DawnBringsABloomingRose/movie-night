import React from "react";
import { Link } from "react-router-dom";

class SideBarLink extends React.Component {

    render() {
        return (<>
        <div className="sidebar-link">
            <Link to={this.props.location}>{this.props.text}</Link>
        </div>
        </>)
    }

};

export default SideBarLink;