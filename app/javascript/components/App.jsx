import React from "react";
import Header from "./Header"
import Results from "./Results"
import Suggestions from "./SuggestionHome";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.results = [];
        this.getResults = this.getResults.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    state = {
        results: [],
        location: "home"
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

    render() {
        var mainPage;
        if (this.state.location == "home") {
            mainPage = (<Suggestions></Suggestions>)
        }
        else {
            mainPage = (<Results sendResults={this.state.results} />);
        }
        return <>
        <Header sendResults ={this.getResults} sendLocation={this.getLocation}/>
        {mainPage}
        </>;
    }
}

export default App;