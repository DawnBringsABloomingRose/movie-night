import { message, Popconfirm, List } from "antd";
import React from "react";
import Movie from "./Movie";
import Api from "./helpers/api";

class Suggestions extends React.Component {
  columns = [
    {
      title: "Movie",
      dataIndex: "movie",
      key: "movie",
    },
    {
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm title="Are you sure to delete this suggestion?" onConfirm={() => this.deletesuggestion(record.id)} okText="Yes" cancelText="No">
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  state = {
    suggestions: [],
  };

  componentDidMount() {
    this.loadsuggestions();
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
    const url = "api/v1/suggestions/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
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
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadsuggestions = () => {
    this.setState({ suggestions: [] });
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

  render() {
    var movies = this.state.suggestions.map(movie => 
      <li key={movie.id}><Movie movie = { movie.movie } suggested = {true} user = { movie.user } 
                                likes={movie.likes} currentUser={this.props.currentUser} id={movie.id}
                                blocks={movie.blocks}/></li>
    );
    return (
      /*<>
        <Table className="table-striped-rows" dataSource={this.state.suggestions} columns={this.columns} pagination={{ pageSize: 5 }} />

        <AddSuggestionModal reloadsuggestions={this.reloadsuggestions} />
      </> */
      <>
      <List>{movies}</List>
      </> 
    );
  }
}

export default Suggestions;