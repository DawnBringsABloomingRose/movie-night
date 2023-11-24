import React from "react";
import Header from "./Header"
import Results from "./Results"
import Suggestions from "./SuggestionHome";
import WatchedMovies from "./WatchedMovies";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import HeaderLogo from "./HeaderLogo";
import { ConfigProvider } from "antd";
import UserProfile from "./UserProfile";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.results = [];
        this.getResults = this.getResults.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getTheme = this.getTheme.bind(this);
    }

    state = {
        results: [],
        location: "home",
        currentUser: {},
        theme: 'dark',
    }

    darkTheme = {
        colorPrimary: '#6A866B',
        colorBgContainer: '#212529',
        colorText: '#6c757d',
        colorBorder: "#dee2e6",
        colorBorderSecondary:"#6A866B",
        colorBgElevated: '#212529',
    }

    lightTheme = {
        colorPrimary: '#6A866B',
        colorBgContainer: '#fafafa',
        colorPrimaryText: '#555', 
        colorText: '#555',
        colorBorder: "#6A866B",
        colorBorderSecondary:"#866A85"
    }
    
    getResults(val) {
        
        this.setState((prevState) => ({
            results: val 
        }))
        return this.state.results;
    }
    getTheme(val) {
        this.setState({theme: val});
        return this.state.theme
    }

    getLocation(val) {
        this.setState((prevState) => ({
            location: val
        }))
    }
    
    getCurrentUser() {
        const url = "api/v1/currentuser"

        fetch(url)
          .then((data) => {
            if (data.ok) {
              return data.json();
            }
            throw new Error("Network error.");
          }).then((data) => {
            this.setState(() => ({
                currentUser: data,
            }))
          })
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    render() {
        var mainPage;
        if (this.state.location == "home") {
            mainPage = (<Suggestions currentUser={this.state.currentUser}></Suggestions>)
        }
        else if (this.state.location == "search"){
            mainPage = (<Results sendResults={this.state.results} currentUser={this.state.currentUser}/>);
        }
        else if (this.state.location == "watched"){
            mainPage = (<WatchedMovies currentUser={this.state.currentUser} />);
        }
        return <><ConfigProvider 
            theme={{token: this.state.theme == 'dark' ? this.darkTheme : this.lightTheme }}>
            <HeaderLogo sendTheme={this.getTheme}></HeaderLogo>
            <div className="main-content">
                <Outlet />
            </div>
            <SideBar currentUser={this.props.currentUser} sendTheme={this.getTheme}/>
        </ConfigProvider>
        </>;
    }
}

export default App;