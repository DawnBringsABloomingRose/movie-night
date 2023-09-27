import React from "react";
import Header from "./Header"
import Results from "./Results"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.results = [];
        this.getResults = this.getResults.bind(this);
    }

    state = {
        results: [],
    }
    
    getResults(val) {
        
        this.setState((prevState) => ({
            results: val 
        }))
        return this.state.results;
    }

    render() {
        return <>
        <Header sendResults ={this.getResults} />
        <Results sendResults={this.state.results} />
        </>;
    }
}

export default App;