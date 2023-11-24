import React from "react";
import { Link } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import AddMovie from "./AddMovie";
import ThemeSwitch from "./ThemeSwitch";

class SideBar extends React.Component {

    render() {

        return ( <>
        <div className="sidebar">
            <SideBarLink location={`/`} text="Suggestions" />
            <SideBarLink location={`watched`} text="Watched" />
            <SideBarLink location={`search`} text="Search" />
            <AddMovie />
            <SideBarLink location={`profile/` + this.props.currentUser } text="Profile" />
            <SideBarLink location={`search`} text="Settings" />
            <ThemeSwitch sendTheme={this.props.sendTheme}/>
        </div>
        </>)
    }
}

export default SideBar;