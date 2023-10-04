import React from "react";
import {Space, Tag, Input, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class Tags extends React.Component {
    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    }

    handleClose = (block) => {
        let jsonbody = {movie_id: this.props.movie_id, block_id: block.id};
        const url = 'api/v1/blockmovies';
        fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(jsonbody),
        })
        .then((data) => {
            if (data.ok) {
                console.log(data)
              return data.json();
            }
            throw new Error("Network error.");
          });
    }

    mapBlocks() {
        let tags = []
        tags = this.props.blocks.map((block) =>
        <span key={block.id}  style={{ display: 'inline-block' }}>
            <Tag
                style={{backgroundColor: 'white'}}
                closable={this.props.editable}
                onClose={(e) => {
                    e.preventDefault
                    this.handleClose(block)}}
                >
                    {block.name}
            </Tag> </span>
        ) 
        this.setState(() =>({
            tags: tags,
        }))
        //console.log(tags)
    }

    componentDidMount() {
        this.mapBlocks();
    }

    handleInputChange = (e) => {
        this.setState(() => ({inputValue: e.target.value}))
    }

    updateTags = (new_tag) => {
        let block = {id: new_tag.block_id, name: new_tag.name}
        let newel = <span key={block.id}  style={{ display: 'inline-block' }}>
                <Tag
                    style={{backgroundColor: 'white'}}
                    closable={this.props.editable}
                    onClose={(e) => {
                        e.preventDefault
                        this.handleClose(block)}}
                    >
                        {block.name}
                </Tag> </span>;
        
        this.setState((prevState) => ({
            inputValue: '',
            inputVisible: false,
            tags: [...prevState.tags, newel],
        }))
    }

    handleInputConfirm = () => {
        if (this.state.inputValue == '') {
            this.setState(() => ({
                inputVisible: false,
            }))
            return 
        }
        let jsonbody = {movie_id: this.props.movie_id, block_name: this.state.inputValue}
        const url = 'api/v1/blockmovies/'
        fetch(url, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonbody),
          }).then((data) => {
            if (data.ok) {
              return data.json();
            }
            throw new Error("Network error.");
          }).then((data) => {
            this.updateTags(data);
          });
          this.setState
    }

    showInput = () => {
        this.setState(() => ({
            inputVisible: true,
        }))
    }

    render() {
        return (<>
            {this.state.tags}
            {this.state.inputVisible ? (
        <Input
          type="text"
          size="small"
          autoFocus
          style={{ width: 78 }}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      ) : (
        <Tag onClick={this.showInput} style={{
            background: 'white',
            borderStyle: 'dashed',
          }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
        </>)
    }
}

export default Tags;