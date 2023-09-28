import React from "react";
import { Button, Form, Input, Modal, Checkbox } from 'antd';



class MovieButtons extends React.Component {
    formRef = React.createRef();
    //formRef = React.useRef<FormInstance>(null);

    state = {
        visible: false,
    }

    submitForm = (values) => {
        values.name = this.props.name;
        values.length_in_minutes = this.props.runtime;
        values.year = this.props.year;
        values.tmdb_ref = this.props.tmdb_ref;
        console.log(values);
        const url = "api/v1/suggestions/";
        fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((data) => {
            if (data.ok) {
              this.handleCancel();
    
              return data.json();
            }
            throw new Error("Network error.");
          })
          .then(() => {
            this.props.reloadsuggestions();
          })
          .catch((err) => console.error("Error: " + err));
    };


    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleCancel = () => {
        this.setState({
          visible: false,
        });
    };
    
    render() {

        return (
            <>
            <Button type="primary" onClick={this.showModal}>
                Create New +
            </Button>
            <Modal open={this.state.visible} title="Suggest movie" okText="Submit" cancelText="Cancel" onCancel={this.handleCancel} footer={null}>
                <Form ref={this.formRef} name="suggestion" onFinish={this.submitForm}>
                    <Form.Item name="halloween" label="For Spooky month?" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
                </Form>
            </Modal>
            </>
        )
    }
}

export default MovieButtons;