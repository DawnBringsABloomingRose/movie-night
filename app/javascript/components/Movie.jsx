import React from "react";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  loadtmdb = () => {
    if (this.props.movie.tmdb_ref == null) {
      return
    }
    
    const url = "search/" + this.props.movie.tmdb_ref;
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        console.log(data)
        this.setState((prevState) => ({
          tmdb_info: data,}))

      })
      .catch((err) => message.error("Error: " + err));
  };

  componentDidMount() {
    this.loadtmdb();
  }

  render() {
    console.log(this.props)
    //title, year, HIGHLIGHTED HALLOWEEN
    //rec'd by
    // run time, year, genre
    return (
    <>
      <h2>{this.props.movie.name}</h2>
      <p>Recommended by {this.props.user.name}</p>
    </>);
  }
}

export default Movie;