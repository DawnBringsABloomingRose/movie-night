import React from "react";
import { Form, Select, Radio, Switch } from "antd";

class SuggestionFilter extends React.Component {

    state = {
        blockOptions: [],
    }

    valuesChanged = (change, all) => {
        this.props.sendParams(all);
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

    componentDidMount() {
        this.loadblocks()
    }
    render() {
        return (
        <Form
          style={{}}
          layout="inline"
          onValuesChange={this.valuesChanged}
          initialValues={{
            order_by: "age",
            direction: "desc",
            halloween: false,
          }}>
            <Form.Item label="Halloween" name="halloween" valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item label="Tags" name="tags">
                <Select allowClear options={this.state.blockOptions} optionFilterProp="label" />
            </Form.Item>

            <Form.Item label="Order by" name="order_by">
                <Select >
                    <Select.Option value="age">Age</Select.Option>
                    <Select.Option value="likes">Likes</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Direction" name="direction">
                <Radio.Group>
                    <Radio value="asc"> Asc </Radio>
                    <Radio value="desc"> Desc </Radio>
                </Radio.Group>
            </Form.Item>
          </Form>)
    }
}

export default SuggestionFilter;