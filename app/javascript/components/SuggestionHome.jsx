import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddSuggestionModal from "./AddSuggestionModal";
import Movie from "./Movie";

class suggestions extends React.Component {
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
        console.log(data)
        data.forEach((suggestion) => {
          const newEl = {
            key: suggestion.id,
            id: suggestion.id,
            movie: suggestion.movie,
            user: suggestion.user,
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
      <li key={movie.id}><Movie movie = { movie.movie } suggested = {true} user = { movie.user }/></li>
    );
    return (
      /*<>
        <Table className="table-striped-rows" dataSource={this.state.suggestions} columns={this.columns} pagination={{ pageSize: 5 }} />

        <AddSuggestionModal reloadsuggestions={this.reloadsuggestions} />
      </> */
      <>
      <ul>{movies}</ul>
      </> 
    );
  }
}

export default suggestions;