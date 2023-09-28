import React from "react";
import { message } from "antd";
import MovieButtons from "./MovieButtons";

class Movie extends React.Component {
  constructor(props) {
    super(props);
    var tmdb_info;
    //this.loadtmdb();
  }

  loadtmdb = () => {
    if (this.props.movie.tmdb_ref == null) {
      return
    }
    
    const url = "search/" + this.props.movie.tmdb_ref + '.json';
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        console.log(data)
        tmdb_info = data;
        this.setState((prevState) => ({
          tmdb_info: data,}))

      })
      .catch((err) => message.error("Error: " + err));
  };

  componentDidMount() {
    this.loadtmdb();
  }

  render() {
    //console.log(this.props)
    //title, year, HIGHLIGHTED HALLOWEEN
    //rec'd by
    // run time, genre
    var heading;
    var recdby;
    var line3;
    if (this.props.movie.halloween) {
      heading =  <h2>{this.props.movie.name} - ({this.props.movie.year}) <bold>FOR HALLOWEEN</bold></h2>;
    }
    else {
      heading =  <h2>{this.props.movie.name} - ({this.props.movie.year})</h2>;
    }
    
    if (this.props.suggested) {
      recdby = <p>Recommended by {this.props.user.name}</p>;
    }
    else {
      recdby = <MovieButtons name={this.props.movie.name} year={this.props.movie.year} runtime={this.props.movie.runtime} tmdb_ref={this.props.movie.id}></MovieButtons>;
    }
    line3 = <p>{this.props.movie.runtime}{this.props.movie.length_in_mins} minutes long</p>
    if (this.state) {
      var line4 = <p>{this.state.tmdb_info.genres.map(genre => genre.name+ ',')}</p>
    }
    if (this.props.movie.genres) {
      var line4 = <p>{this.props.movie.genres.map(genre => genre.name + ',')}</p>
    }
    return (
    <>
      {heading}
      {recdby}
      {line3} 
      {line4}
    </>);
  }
}

export default Movie;