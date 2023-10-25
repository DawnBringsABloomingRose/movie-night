import React from "react";
import Movie from "./Movie"
import { List } from "antd";

class Results extends React.Component {
    render() {
        var movies = this.props.sendResults.map(movie => 
            <li key={movie.id}><Movie movie = { movie } suggested = {movie.suggested} user = { movie.user } likes={movie.likes} blocks={movie.blocks}
            currentUser={this.props.currentUser}/></li>
          );
      
        return <>
        <List>{ movies }</List>
        </>
    }
}

export default Results;