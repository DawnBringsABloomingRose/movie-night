import React from "react";
import {message, Button, Space} from "antd";
import { SearchOutlined } from '@ant-design/icons';

class SearchBar extends React.Component {

    render() {
        return (<div className="search-bar">
            <form method="post" onSubmit={this.props.onSubmit}>
              <Space>
               <label htmlFor="movie_name">
                  Movie Name Or TMDB ID: <input name="movie_name" type="text" id="movie_name" />
                </label>
                <Button type="primary" shape="circle" icon={<SearchOutlined />} htmlType="submit"/></Space>
            </form>
        </div>)
    }
};

export default SearchBar;