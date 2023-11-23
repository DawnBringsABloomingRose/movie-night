import React from "react";
import {Button, Form, Input, Checkbox } from "antd";
import { Navigate } from "react-router-dom";
import DeleteSuggestion from "./DeleteSuggestion";

class EditTab extends React.Component {
    formRef = React.createRef();
    refresh = false;
    state = {
        refresh: false,
    }

    submitForm = (values) => {
        //name, year, length, image, link
        console.log(values);
        const url = "api/v1/movies/" + this.props.id;
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((data) => {
            if (data.ok) {
              //this.handleCancel();
              this.setState({refresh: true,})
              location.reload();
              return data.json();
            }
            throw new Error("Network error.");
          })


    };

    render() {
        return(<>
        <div className="edit-tab">

        <DeleteSuggestion id={this.props.id}/>
        <Form ref={this.formRef} name="suggestion" onFinish={this.submitForm}
            initialValues={{name: this.props.name,
                year: this.props.year,
                length_in_mins: this.props.length_in_mins,
                link: this.props.link,
                image: this.props.image,
                halloween: this.props.halloween,}}>
                    <Form.Item name="name" label="Movie Name" required>
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="length_in_mins" label="Length? (in minutes)">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="year" label="Release Year">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="link" label="Link to information">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="image" label="An image link to display">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="halloween" label="For Spooky month?" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
                </Form>
                {this.props.tags}
                {this.props.watched}

        </div>
        </>);
    }
}

export default EditTab;