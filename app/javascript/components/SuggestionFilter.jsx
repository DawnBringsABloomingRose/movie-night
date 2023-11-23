import React from "react";
import { Form, Select, Radio, Switch } from "antd";
import { DownCircleTwoTone, CaretDownOutlined, CloseOutlined } from '@ant-design/icons'

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
          <div className="params-bar">
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
                <Select className="select" 
                allowClear={<CloseOutlined style={{color: '#6A866B'}} />} options={this.state.blockOptions} 
                optionFilterProp="label" style={{ width: 150 }}
                suffixIcon={<CaretDownOutlined style={{color: '#6A866B'}} />}
                />
            </Form.Item>

            <Form.Item label="Order by" name="order_by">
                <Select className="select" suffixIcon={<CaretDownOutlined style={{color: '#6A866B'}} />}>
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
          </Form></div>)
    }
}

export default SuggestionFilter;