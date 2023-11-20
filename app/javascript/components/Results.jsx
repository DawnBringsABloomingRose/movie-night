import React from "react";
import Movie from "./Movie"
import { List, Button } from "antd";
import SearchBar from "./SearchBar"

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    state = {
        searchResults: [],
        moviesList: [],
    }

    getSearchResults(e) {
        var test = 0;
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
        /*data.forEach(movie => {
            test+= 1;
            console.log(test);
            const newEl = <li key={movie.id}><Movie movie = { movie } suggested = {movie.suggested} user = { movie.user } likes={movie.likes} blocks={movie.blocks}
            currentUser={this.props.currentUser}/></li>;
            this.setState((prevState) => ({
              searchResults: [...prevState.searchResults, movie],
              //moviesList: [...prevState, newEl], 
            }))
        }) */;
        console.log(data);
        this.setState({searchResults: data});

        //this.props.sendResults(data);
        //this.props.sendLocation("search");
      })
      .catch((err) => message.error("Error: " + err));
    }


    loadMore = !this.state.isLoading ? (<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={this.onLoadMore}>Load More Movies</Button>
      </div>) : null;

      componentDidMount() {
        this.setState(() => ({ searchResults:[],
            moviesList: [],
        }))
        console.log(this.state);
      }
    render() {
        var movies = this.state.searchResults.map(movie => 
            <li key={movie.id}><Movie movie = { movie } suggested = {movie.suggested} user = { movie.user } likes={movie.likes} blocks={movie.blocks}
            currentUser={this.props.currentUser}/></li>
          );
      
        return <>
            <SearchBar onSubmit={this.getSearchResults}></SearchBar>
            <List>{ movies }</List>
        </>
    }
}

export default Results;