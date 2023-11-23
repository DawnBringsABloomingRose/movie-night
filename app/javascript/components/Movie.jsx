import React from "react";
import { message, Card, Button } from "antd";
import MovieButtons from "./MovieButtons";
import pumpkin from '../../assets/images/pumpkin.png'
import LikeButton from "./LikeButton";
import DeleteSuggestion from "./DeleteSuggestion";
import Tags from "./Tags";
import UserLink from "./UserLink";
import InfoTab from "./InfoTab";
import EditTab from "./EditTab";

class Movie extends React.Component {

  state = {
    activeTab: 'basic',
    tmdb_info: {genres:[]},
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
  }
  constructor(props) {
    super(props);
    var tmdb_info;
    //wrong this needs to be currentuser.admin
    if ((this.props.user.id == this.props.currentUser || this.props.admin) && this.props.suggested) {
      this.tabList.push( {
        key: 'edit',
        label: 'Edit Info'
      },)
    }
    //this.loadtmdb();
  }

  tabList = [
    {
      key: 'basic',
      label: 'Basic Info',
    },
    {
      key: 'tmdb',
      label: 'TMDB Info'
    },
  ]

  basicInfo = <></>;
  tmdbInfo = <></>;
  editInfo = <></>;

  tabContent = {
    basic: this.basicInfo,
    tmdb: this.tmdbInfo,
    edit: this.editInfo,
  }

  onTabChange = (key) => {
    this.setState(() =>
    ({activeTab: key}));
  }
  loadtmdb = () => {
    if (this.props.movie.tmdb_ref == null) {
      this.setImage();
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
          tmdb_info: data,
          imagePath: 'https://www.themoviedb.org/t/p/original/' + data.poster_path}));
        
        this.setImage();

      })
      .catch((err) => message.error("Error: " + err));
  };

  setImage() {
    if (!this.props.suggested) {
      this.setState(() => ({
        imagePath: 'https://www.themoviedb.org/t/p/original/' + this.props.movie.poster_path
      }))
    }
    if (this.props.movie.image != null) {
      this.setState(() => ({
        imagePath: this.props.movie.image,
      }))
    }
  }

  componentDidMount() {
    this.loadtmdb();
    if (!this.props.suggested) {
      this.setState(() => ({
        imagePath: 'https://www.themoviedb.org/t/p/original/' + this.props.movie.poster_path
      }))
    }
  }

  getBlocks() {

  }

  updateWatchStatus = () => {
    const url = "api/v1/movies/" + this.props.id;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({watched: true,}),
    }).then((data) => {
      if (data.ok) {
        return data.json();
      }
      throw new Error("Network error.");
    })
  }

  updateTabContents = () => {
    var leftContent;
    var information
    if (this.props.suggested && this.props.user != null) {
      leftContent = <p className="user-rec">Recommended by <UserLink name={this.props.user.name} id={this.props.user.id} /></p>
      information = this.state.tmdb_info
    } 
    else {
      leftContent = <MovieButtons name={this.props.movie.name} year={this.props.movie.year} runtime={this.props.movie.runtime} tmdb_ref={this.props.movie.id}></MovieButtons>;;
      information = this.props.movie;
    }

    this.basicInfo = <>
    <div className="basic-tab">
      <img src={this.state.imagePath}/>
      {leftContent}
      <p>{this.props.movie.runtime}{this.props.movie.length_in_mins} minutes long</p>
      <div className="movie-tags">
        {this.props.blocks ? <Tags blocks={this.props.blocks} editable={this.props.user.id == this.props.currentUser.id} movie_id={this.props.movie.id}/> : <></>}
      </div>
    </div></>;

    this.tmdbInfo = <><InfoTab info={information}/></>;

    var watchedButton = <></>;
    if (this.props.admin) {
      watchedButton = <Button onClick={this.updateWatchStatus} >Set to Watched</Button>
    }
    var tags = this.props.blocks ? <Tags blocks={this.props.blocks} editable={true} movie_id={this.props.movie.id}/> : <></>;
    if ((this.props.admin || parseInt(this.props.currentUser) == this.props.user.id) && this.props.suggested) {
      this.editInfo = <EditTab name={this.props.movie.name} 
        year={this.props.movie.year} 
        length_in_mins={this.props.movie.length_in_mins} 
        link={this.props.movie.link}
        image={this.props.movie.image}
        halloween={this.props.movie.halloween}
        id={this.props.id}
        tags={tags}
        watched={watchedButton}/>
      /*
      this.editInfo = <><div className="editor">
          <DeleteSuggestion id={this.props.id}/>
          {this.props.blocks ? <Tags blocks={this.props.blocks} editable={true} movie_id={this.props.movie.id}/> : <></>}
          {watchedButton}
        </div></>; */
    }

    this.tabContent = {
      basic: this.basicInfo,
      tmdb: this.tmdbInfo,
      edit: this.editInfo,
    }; 
  }

  render() {
    this.updateTabContents();
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
      title = <div className="cardtitle"><LikeButton suggestion_id={this.props.id} likes={this.props.likes} currentUser={this.props.currentUser.id}/><h2>{this.props.movie.name + " - " + this.props.movie.year}</h2>
        <img src={pumpkin} alt="A small pumpkin, signifying halloween" /></div>
    }
    else if (this.props.suggested) {
      heading =  <h2>{this.props.movie.name} - ({this.props.movie.year})</h2>;
      title = <div className="cardtitle"><LikeButton suggestion_id={this.props.id} likes={this.props.likes} currentUser={this.props.currentUser.id}/><h2>{this.props.movie.name + " - " + this.props.movie.year}</h2>
        </div>
      cardClass = "card"
    }
    
    if (this.props.suggested && this.props.user !== null) {
      recdby = <p>Recommended by {this.props.user.name}</p>;
      if (this.props.user.id == this.props.currentUser.id) {
        extra = <DeleteSuggestion id={this.props.id}/>
      }
    }

    else {
      recdby = <MovieButtons name={this.props.movie.name} year={this.props.movie.year} runtime={this.props.movie.runtime} tmdb_ref={this.props.movie.id}></MovieButtons>;
    }
    line3 = <p>{this.props.movie.runtime}{this.props.movie.length_in_mins} minutes long</p>
    
    return (
    <>
    <Card style={{width: '100%'}} 
          title={title} 
          className={cardClass} 
          extra={extra}
          tabList={this.tabList}
          activeTabKey={this.state.activeTab}
          onTabChange={this.onTabChange}>
      {this.tabContent[this.state.activeTab]}      
      </Card>
    </>);
  }
}

export default Movie;