import React from "react";
import Logo from '../../assets/images/Movie-night.png';
import { Link } from "react-router-dom";
import { Switch } from "antd";
import Sun from "../../assets/images/sun.svg"
import Moon from "../../assets/images/moon.svg"
import ThemeSwitch from "./ThemeSwitch";

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        const localTheme = localStorage.getItem("theme");
        const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
        let currentThemeSetting = this.calculateTheme(localTheme, systemSettingLight);
        const darkTheme = (currentThemeSetting == "dark");
        //this.setState({currentTheme: currentThemeSetting,  darkTheme: darkTheme})
        this.darkTheme = darkTheme;
        document.querySelector("html").setAttribute("data-theme", currentThemeSetting);
    }
    state={
        currentTheme: "dark",
    }

    calculateTheme(local, system) {
        if (local !== null) {
            return local;
        }
        if (system.matches) {
            return "light";
        }
        return "dark";
    }

    componentDidMount() {
        const localTheme = localStorage.getItem("theme");
        const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
        let currentThemeSetting = this.calculateTheme(localTheme, systemSettingLight);
        const darkTheme = (currentThemeSetting == "dark");
        this.setState({currentTheme: currentThemeSetting,  darkTheme: darkTheme})
        this.props.sendTheme(currentThemeSetting);
        document.querySelector("html").setAttribute("data-theme", currentThemeSetting);

    }
    changeTheme = (checked) => {
        const newTheme = this.state.currentTheme == 'dark' ? 'light' : 'dark';
        localStorage.setItem("theme", newTheme);
        document.querySelector("html").setAttribute("data-theme", newTheme);
        this.setState({currentTheme: newTheme, })
        this.props.sendTheme(newTheme);
    }
    render() {

        return (<>
        <div className="header"><Link to={`/`}><img src={Logo} alt="Movie Night Logo" className="logo" height={100}/></Link>
        </div>
        </>)
    }
}

export default HeaderLogo;