import React from "react";
import {message} from "antd";

class Header extends React.Component {
    constructor(props){
        super(props);
        var searchQuery = "";
        this.searchResults = "";
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
        console.log(data)
        results = data;
        this.searchResults = data;
        this.setState((prevState) => ({
          searchResults: data,}))
        this.props.sendResults(data);
      })
      .catch((err) => message.error("Error: " + err));
      console.log(this.searchResults);
    }

    render() {
        return <>
        <form method="post" onSubmit={this.getSearchResults.bind(this)}>
            <label htmlFor="movie_name">
                Movie Name Or TMDB ID: <input name="movie_name" type="text" id="movie_name" />
            </label>
            <button type="submit" >Search</button>
        </form>
        </>
    }
}

export default Header;