import React from "react";
import { Button, Form, Input, Modal, Checkbox, Select } from 'antd';



class MovieButtons extends React.Component {
    formRef = React.createRef();
    //formRef = React.useRef<FormInstance>(null);

    options = [];

    state = {
        visible: false,
        blockOptions: [],
    }

    componentDidMount() {
      //this.loadblocks();
    }

    loadblocks = () => {
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

    submitForm = (values) => {
        values.name = this.props.name;
        values.length_in_mins = this.props.runtime;
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
            <Button type="primary" onClick={this.showModal}>
                Create New +
            </Button>
            <Modal open={this.state.visible} title="Suggest movie" okText="Submit" cancelText="Cancel" onCancel={this.handleCancel} footer={null}>
                <Form ref={this.formRef} name={"suggestion" + this.props.name} onFinish={this.submitForm}>
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

export default MovieButtons;