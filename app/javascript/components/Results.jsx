import React from "react";
import Movie from "./Movie"

class Results extends React.Component {
    render() {
        var movies = this.props.sendResults.map(movie => 
            <li key={movie.id}><Movie movie = { movie } suggested = {movie.suggested} user = { movie.user }/></li>
          );
      
        return <>
        <ul>{ movies }</ul>
        </>
    }
}

export default Results;