import React from "react";
import Header from "./Header"
import Results from "./Results"
import Suggestions from "./SuggestionHome";
import WatchedMovies from "./WatchedMovies";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.results = [];
        this.getResults = this.getResults.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    state = {
        results: [],
        location: "home",
        currentUser: {},
    }
    
    getResults(val) {
        
        this.setState((prevState) => ({
            results: val 
        }))
        return this.state.results;
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
        return <>
        <Header sendResults ={this.getResults} sendLocation={this.getLocation} currentUser={this.state.currentUser}/>
        <div className="main-content">
            <Outlet />
        </div>
        <SideBar />
        </>;
    }
}

export default App;