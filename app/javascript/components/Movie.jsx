import React from "react";
import { message, Card } from "antd";
import MovieButtons from "./MovieButtons";
import pumpkin from '../../assets/images/pumpkin.png'
import LikeButton from "./LikeButton";
import DeleteSuggestion from "./DeleteSuggestion";
import Tags from "./Tags";

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
        tmdb_info = data;
        this.setState((prevState) => ({
          tmdb_info: data,}))

      })
      .catch((err) => message.error("Error: " + err));
  };

  componentDidMount() {
    this.loadtmdb();
  }

  getBlocks() {

  }

  render() {
    //console.log(this.props)
    //title, year, HIGHLIGHTED HALLOWEEN
    //rec'd by
    // run time, genre
    var heading;
    var recdby;
    var line3;
    var title = <h2>{this.props.movie.name + " - " + this.props.movie.year}</h2>
    var cardClass;
    var extra;
    if (this.props.movie.halloween) {
      heading =  <h2>{this.props.movie.name} - ({this.props.movie.year}) <bold>FOR HALLOWEEN</bold></h2>;
      cardClass = "halloween";
      title = <div className="cardtitle"><LikeButton suggestion_id={this.props.id} likes={this.props.likes} currentUser={this.props.currentUser}/><h2>{this.props.movie.name + " - " + this.props.movie.year}</h2>
        <img src={pumpkin} alt="A small pumpkin, signifying halloween" /></div>
    }
    else if (this.props.suggested) {
      heading =  <h2>{this.props.movie.name} - ({this.props.movie.year})</h2>;
      title = <div className="cardtitle"><LikeButton suggestion_id={this.props.id} likes={this.props.likes} currentUser={this.props.currentUser}/><h2>{this.props.movie.name + " - " + this.props.movie.year}</h2>
        </div>
      cardClass = "card"
    }
    
    if (this.props.suggested && this.props.user !== null) {
      recdby = <p>Recommended by {this.props.user.name}</p>;
      if (this.props.user.id == this.props.currentUser) {
        extra = <DeleteSuggestion id={this.props.id}/>
      }
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
    <Card style={{width: '100%'}} title={title} className={cardClass} extra={extra}>
      {recdby}
      {line3} 
      {line4}
      <Tags blocks={this.props.blocks} editable={this.props.user.id == this.props.currentUser} movie_id={this.props.movie.id}/>
      </Card>
    </>);
  }
}

export default Movie;