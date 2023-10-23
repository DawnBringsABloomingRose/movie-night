import React from "react";
import {message, Button, Space} from "antd";
import { SearchOutlined } from '@ant-design/icons';
import AddBlock from "./AddBlock";
import AddMovie from "./AddMovie";

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
        return (<div className="header">
          <Space>
            <Button type="primary" onClick={this.backToHome.bind(this)}>Home</Button>
            <AddBlock />
            <AddMovie />
          </Space>
          <br />
          <Space>
            <form method="post" onSubmit={this.getSearchResults.bind(this)}>
              <Space>
               <label htmlFor="movie_name">
                  Movie Name Or TMDB ID: <input name="movie_name" type="text" id="movie_name" />
                </label>
                <Button type="primary" shape="circle" icon={<SearchOutlined />} htmlType="submit"/></Space>
            </form>
          </Space>
        </div>)
    }
}

export default Header;