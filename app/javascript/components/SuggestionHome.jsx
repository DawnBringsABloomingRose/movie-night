import { message, Popconfirm, List, Button } from "antd";
import React from "react";
import { useEffect } from "react";
import Movie from "./Movie";
import Api from "./helpers/api";
import SuggestionFilter from "./SuggestionFilter";

class Suggestions extends React.Component {

  constructor(props) {
    super(props);
    this.offset = 0;
    this.isLoading = true;
    this.getParams = this.getParams.bind(this)
  }



  state = {
    suggestions: [],
    params: {
      halloween: false,
      tags: undefined,
      order_by: 'age',
      direction: 'desc',
    }
  };

  componentDidMount() {
    this.loadsuggestions();
  }

  getParams(val) {
    this.setState((prevState) => ({
      params: val,
  }), this.reloadsuggestions)
  }

  /*loadsuggestions = () => {
    api = new Api();
    api.getCall('suggestions/index').then((data) => 
    data.forEach((suggestion) => {
      const newEl = {
        key: suggestion.id,
        id: suggestion.id,
        movie: suggestion.movie,
        user: suggestion.user,
        likes: suggestion.likes,
        blocks: suggestion.blocks,
      };

      this.setState((prevState) => ({
        suggestions: [...prevState.suggestions, newEl],
      }));
    }));
  } */

  loadsuggestions = () => {
    let query = "offset=" + this.offset + '&' +  new URLSearchParams(this.state.params);
    const url = "api/v1/suggestions/index?" + query;
    fetch(url, {
        method: "get",
        headers: {
        "Content-Type": "application/json",
        },
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((suggestion) => {
          const newEl = {
            key: suggestion.movie.id,
            id: suggestion.movie.id,
            movie: suggestion.movie,
            user: suggestion.user,
            likes: suggestion.likes,
            blocks: suggestion.blocks,
          };

          this.setState((prevState) => ({
            suggestions: [...prevState.suggestions, newEl],
          }));
        });
        this.isLoading = false;
        this.offset += 1;
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadsuggestions = () => {
    this.setState({ suggestions: [] });
    this.offset = 0;
    this.loadsuggestions();
  };

  deletesuggestion = (id) => {
    const url = `api/v1/suggestions/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadsuggestions();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  onLoadMore = () => {
    this.isLoading = true;
    this.loadsuggestions();
  }

  loadMore = !this.isLoading ? (<div
    style={{
      textAlign: 'center',
      marginTop: 12,
      height: 32,
      lineHeight: '32px',
    }}
  >
    <Button onClick={this.onLoadMore}>Load More Suggestions</Button>
  </div>) : null;

  render() {
    var movies = this.state.suggestions.map(movie => 
      <li key={movie.id}><Movie movie = { movie.movie } suggested = {true} user = { movie.user } 
                                likes={movie.likes} currentUser={this.props.currentUser} id={movie.id}
                                blocks={movie.blocks}/></li>
    );
    return (
      <>
      <SuggestionFilter sendParams={this.getParams}/>
      <List
        className="suggestion-list"
        loading={this.isLoading}
        loadMore={this.loadMore}>{movies}</List>
      </> 
    );
  }
}

export default Suggestions;