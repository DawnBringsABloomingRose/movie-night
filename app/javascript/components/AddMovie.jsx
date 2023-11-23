import React from "react";
import { Button, Form, Input, Modal, Checkbox, Select, InputNumber } from 'antd';

class AddMovie extends React.Component {
    formRef = React.createRef();
    
    state = {
        visible: false,
        blockOptions: [],
    }

    submitForm = (values) => {

        //name, year, length, tmdb_ref, image, link
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

              location.reload();
              return data.json();
            }
            throw new Error("Network error.");
          })

    };

    loadblocks = () => {
        if (this.state.blockOptions.length != 0) {
            return;
        }
        const url = "api/v1/blocks/index";
        fetch(url)
          .then((data) => {
            if (data.ok) {
              return data.json();
            }
            throw new Error("Network error.");
          })
          .then((data) => {
            console.log(data)
            data.forEach((block) => {
              const newEl = {
                value: block.id,
                label: block.name,
              };
    
              this.setState((prevState) => ({
                blockOptions: [...prevState.blockOptions, newEl],
              }));
            });
          })
          .catch((err) => message.error("Error: " + err));
      };

    showModal = () => {
        this.setState({
          visible: true,
        });
        this.loadblocks();
    };
    
    handleCancel = () => {
        this.setState({
          visible: false,
        });
    };

    render() {

        return (
            <>
            <Button type="default" onClick={this.showModal}>
                Add Custom Suggestion
            </Button>
            <Modal open={this.state.visible} title="Add Block" okText="Submit" cancelText="Cancel" onCancel={this.handleCancel} footer={null}>
                <Form ref={this.formRef} name="suggestion" onFinish={this.submitForm}>
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
                    <Form.Item name="tmdb_ref" label="TMDB Ref #?">
                        <InputNumber></InputNumber>
                    </Form.Item>
                    <Form.Item name="halloween" label="For Spooky month?" valuePropName="checked">
                        <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item name="blocks" label="Suggested Blocks:">
                      <Select mode="multiple" allowClear placeholder="None is also an option" options={this.state.blockOptions} optionFilterProp="label" />
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

export default AddMovie;