import React from "react";
import { Button } from "antd";
import { DeleteFilled } from '@ant-design/icons';

class DeleteSuggestion extends React.Component {

    deleteSugg = () => {
        const url = `api/v1/suggestions/${this.props.id}`;
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

        location.reload();
    }

    render() {
        return(<>
            <Button icon={<DeleteFilled color="red" />} onClick={this.deleteSugg} danger/>
        </>)
    }
}

export default DeleteSuggestion