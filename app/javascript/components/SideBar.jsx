import React from "react";
import { Link } from "react-router-dom";

class SideBar extends React.Component {

    render() {

        return ( <>
        <div className="sidebar">
            <Link to={`/`}>Home</Link>
            <Link to={`watched`}>Watched</Link>
            <Link to={`search`}>Search</Link>
        </div>
        </>)
    }
}

export default SideBar;