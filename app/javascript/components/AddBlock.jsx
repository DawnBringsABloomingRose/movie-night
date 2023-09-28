import React from "react";
import { Button, Form, Input, Modal, Checkbox } from 'antd';

class AddBlock extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
    }

    submitForm = (values) => {
        console.log(values);
        const url = "api/v1/blocks/";
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
          });

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
                Add Block
            </Button>
            <Modal open={this.state.visible} title="Add Block" okText="Submit" cancelText="Cancel" onCancel={this.handleCancel} footer={null}>
                <Form ref={this.formRef} name="suggestion" onFinish={this.submitForm}>
                    <Form.Item name="name" label="New Block Name">
                        <Input type="textarea" />
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

export default AddBlock;