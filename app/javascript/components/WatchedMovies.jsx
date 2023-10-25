import React from "react";
import Movie from "./Movie";
import { List } from "antd";

class WatchedMovies extends React.Component {

    state = {
        watchedMovies: [],
        movieList: [],
        isLoading: true,
        offset: 0,
    }

    getWatchedMovies() {
        const url = "api/v1/watched?offset=" + this.state.offset;
        fetch(url).then((data) => {
            if (data.ok) {
                return data.json();
              }
              throw new Error("Network error.");
        }).then((data) => {
            var movies = []
            data.forEach(movie => {
                const newEl = {
                    key: movie.id,
                    id: movie.id,
                    movie: movie.movie,
                    user: movie.user,
                    likes: movie.likes,
                    blocks: movie.blocks,
                }
                movies.push(newEl);
                this.setState((prevState) => ({
                    watchedMovies: [...prevState.watchedMovies, newEl]
                }));
            });
            return movies;
        }).then((watchedMovies) => {
            console.log(watchedMovies);
            console.log(this.state.watchedMovies)
            var movies = watchedMovies.map(movie => 
                <li key={movie.id}><Movie movie = { movie.movie } suggested = {true} user = { movie.user } 
                                          likes={movie.likes} currentUser={this.props.currentUser} id={movie.id}
                                          blocks={movie.blocks}/></li>
              );
            this.setState((prevState) => ({
                movieList: movies,
                isLoading: false,
                offset: prevState.offset + 1,
            }));
        })
    }

    onLoadMore = () => {
        this.setState(() => ({
            isLoading: true,
        }));
        this.getWatchedMovies();
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
        this.getWatchedMovies();
    }
    render() {
        return <>
        <List
        className="suggestion-list"
        loading={this.state.isLoading}
        loadMore={this.loadMore}>{this.state.movieList}</List>
        </>
    }
}

export default WatchedMovies;