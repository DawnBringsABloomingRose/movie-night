import React from "react";
import {Button, Space, Badge} from "antd";
import { ArrowUpOutlined } from '@ant-design/icons';

class LikeButton extends React.Component {

    state = {
        status: "nolike",
        style: {},
        onClickEvent: this.createLike,
        likes: [],
    }

    createLike = () => {
        let like = {suggestion_id: this.props.suggestion_id};
        const url = "api/v1/likes";
        fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(like),
        })
          .then((data) => {
            if (data.ok) {
              this.getLikes();
              return data.json();
            }
            throw new Error("Network error.");
          });
    }

    deleteLike = () => {
        const id = this.state.likes.find((el) => el.user_id == this.props.currentUser).id;
        const url = `api/v1/likes/${id}`;
        fetch(url, {
          method: "delete",
        })
          .then((data) => {
            if (data.ok) {
              this.getLikes();
              return data.json();
            }
            throw new Error("Network error.");
          });
    }

    getLikes = () => {
      const url = 'api/v1/likes/index/' + this.props.suggestion_id
      fetch(url, {
        method: 'get',
      }).then((data) => {
        if(data.ok) {
          return data.json();
        }
        throw new Error('Network error.')
      }).then((data)=> {
        this.updateState(data)
      }); 
    }

    updateState = (likes) => {
      //console.log(likes)
      this.setState(() => ({
        likes: likes,
      }))

      if (likes.some((el) => {
        return el.user_id == this.props.currentUser
      })) {
        this.setState(() => ({
            status:"liked",
            style: {background: "aqua", borderColor: "red"},
            onClickEvent: this.deleteLike,
        }));
    }
    else {
      //console.log(likes);
        this.setState(() => ({
            status:"nolike",
            style: {},
            onClickEvent: this.createLike
        }))
    }

    };

    //call update on load, and everytime create or delete likes
    //update: get all the likes, set the state depending on whether the currentuser liked it
    componentDidMount() {
        this.getLikes();
    }

    likeHandler = () => {
        if (this.state.status == "liked") {
            this.deleteLike;
        }
        else {
            this.createLike;
        }
    }

    render() {
        return(<>
        <Button shape="circle" onClick={this.state.onClickEvent} icon={<ArrowUpOutlined />} className={this.state.status} style={this.state.style}>{this.state.likes.length}</Button>
        </>)
    }
}

export default LikeButton;