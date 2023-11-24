import React from "react";
import { Switch } from "antd";
import Sun from "../../assets/images/sun.svg"
import Moon from "../../assets/images/moon.svg"

class ThemeSwitch extends React.Component {

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
        <div className="theme-switch">
                <img src={Sun} height={25}/>
                <Switch onChange={this.changeTheme} defaultChecked={this.darkTheme}/> 
                <img src={Moon} height={25}/>
            </div>
        </>);
    }
};

export default ThemeSwitch;