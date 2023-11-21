import React from "react";
import {message, Button, Space} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import AddBlock from "./AddBlock";
import AddMovie from "./AddMovie";

class Header extends React.Component {
  token = document.getElementsByName('csrf-token')[0].content
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

    watchedMovies() {
      this.setState((prevState) => ({
        location: "watched",
      }))

      this.props.sendLocation("watched");
    }

    render() {
        return (<div className="header">
          <Space>
            <Button type="primary" onClick={this.backToHome.bind(this)}>Home</Button>
            <Button type="primary" onClick={this.watchedMovies.bind(this)}>Watched Movies</Button>
            <AddBlock />
            <AddMovie />
          </Space>
          <br />
        </div>)
    }
}

export default Header;