import React from "react";
import { Link } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import AddMovie from "./AddMovie";

class SideBar extends React.Component {

    render() {

        return ( <>
        <div className="sidebar">
            <SideBarLink location={`/`} text="Suggestions" />
            <SideBarLink location={`watched`} text="Watched" />
            <SideBarLink location={`search`} text="Search" />
            <SideBarLink location={`search`} text="New Custom Movie" />
            <AddMovie />
            <SideBarLink location={`search`} text="Profile" />
            <SideBarLink location={`search`} text="Settings" />
        </div>
        </>)
    }
}

export default SideBar;