import React from "react";
import {message, Button} from "antd";
import AddBlock from "./AddBlock";

class Header extends React.Component {
    constructor(props){
        super(props);
        var searchQuery = "";
        this.searchResults = "";
        this.location = "home";
    }
    state = {
      location: "home",
    }

    getSearchResults(e) {
        e.preventDefault();
        var results;
        var query = new FormData(e.target).get("movie_name");
        console.log(query);
        const url = "search?movie_name=" + query + '&format=json';
        fetch(url)
            .then((data) => {
            if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        results = data;
        this.searchResults = data;
        this.location = "search";
        this.setState((prevState) => ({
          searchResults: data,
          location: "search", }))
        this.props.sendResults(data);
        this.props.sendLocation("search");
      })
      .catch((err) => message.error("Error: " + err));
    }

    backToHome() {
      this.setState((prevState) => ({
        location: "home",
      }))

      this.props.sendLocation("home");
    }

    render() {
      //this.props.sendLocation(this.state.location);
        return (<div className="header">
        <form method="post" onSubmit={this.getSearchResults.bind(this)}>
            <label htmlFor="movie_name">
                Movie Name Or TMDB ID: <input name="movie_name" type="text" id="movie_name" />
            </label>
            <button type="submit" >Search</button>
        </form>
        <Button onClick={this.backToHome.bind(this)}>Home</Button>
        <AddBlock />
        </div>)
    }
}

export default Header;