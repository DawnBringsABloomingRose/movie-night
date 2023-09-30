import React from "react";
import {Button, Space, Badge} from "antd";
import { ArrowUpOutlined } from '@ant-design/icons';

class LikeButton extends React.Component {

    state = {
        status: "nolike",
        style: {},
        onClickEvent: this.createLike,
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
              return data.json();
            }
            throw new Error("Network error.");
          });
        this.setState((prevState) => ({
            status: "liked",
            style: {background: "aqua", borderColor: "red"},
            onClickevent: this.deleteLike,
        }));
    }

    deleteLike = () => {
        const id = this.props.likes.find((el) => el.user_id == this.props.currentUser).id;
        const url = `api/v1/likes/${id}`;
        fetch(url, {
          method: "delete",
        })
          .then((data) => {
            if (data.ok) {
    
              return data.json();
            }
            throw new Error("Network error.");
          });
        this.setState((prevState) => ({
            status: "nolike",
            style: {},
            onClickEvent: this.createLike,
        }));
    }

    componentDidMount() {
        if (this.props.likes.some((el) => {
            return el.user_id == this.props.currentUser
        })) {
            this.setState((prevState) => ({
                status:"liked",
                style: {background: "aqua", borderColor: "red"},
                onClickEvent: this.deleteLike,
            }));
        }
        else {
            this.setState((prevState) => ({
                status:"nolike",
                style: {},
                onClickEvent: this.createLike
            }))
        }
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
        <Button shape="circle" onClick={this.state.onClickEvent} icon={<ArrowUpOutlined />} className={this.state.status} style={this.state.style}>{this.props.likes.length}</Button>
        </>)
    }
}

export default LikeButton;