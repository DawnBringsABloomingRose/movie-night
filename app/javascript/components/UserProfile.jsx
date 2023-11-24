import React from "react";
import Movie from "./Movie";
import { List } from "antd";
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UserProfile extends React.Component {

    state = {
        suggestedMoviesList: [],
        likedMoviesList: [],
    }

    getUserInformation = () => {

        const url = "/api/v1/user/" + this.id;
        
        fetch(url)
        .then((data) => {
            if (data.ok) {
                return data.json();
              }
              throw new Error("Network error.");
        })
        .then((data) => {
            this.setState({userData: data})
            console.log(data);

            let suggestions = data.suggested_movies.map(movie => 
                <li key={movie.id}><Movie movie = { movie } suggested = {true} user = { movie.user } 
                                          likes={movie.likes} currentUser={this.props.currentUser} admin={this.props.admin} id={movie.id}
                                          blocks={movie.blocks}/></li>)
                                    
            let likes = data.liked_movies.map(movie => 
                <li key={movie.id}><Movie movie = { movie } suggested = {true} user = { movie.user } 
                                          likes={movie.likes} currentUser={this.props.currentUser} admin={this.props.admin} id={movie.id}
                                          blocks={movie.blocks}/></li> )

            this.setState({likedMoviesList: likes, suggestedMoviesList: suggestions})
        })
    }


    componentDidMount() {
        let {id} = this.props.params;
        this.id = id;
        this.getUserInformation();
    }

    render() {
        return(<>
        <List
        className="suggestion-list">{this.state.suggestedMoviesList}</List>
        </>)
    }

};

export default withParams(UserProfile);