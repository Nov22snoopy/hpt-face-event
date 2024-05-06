import React from "react";
import { Form, Input, Button, ConfigProvider, Select } from "antd";
import { useDispatch } from "react-redux";
import { addList } from "../../../store/faceDetection/thunkAction";
const AddList = () => {
  const dispatch = useDispatch()
  const onFinish = (value) => {
    const data = {
      stream_id: Number(value.stream_id),
      va_id: Number(value.va_id),
      age: value.age,
      gender: value.gender,
      mask: value.mask
    }
    dispatch(addList(data))
  };
  return (
    <div className=" w-2/3 mx-auto" style={{minHeight: '100vh'}}> 
      <ConfigProvider
        theme={{
          components: {
            Form: {
              /* here is your component tokens */
              labelFontSize: "24px",
            },
          },
        }}
      >
        <Form
          className="mx-auto"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: "600" }}
          initialValues={{ remeber: true }}
          autoComplete="off"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="stream_id"
            name="stream_id"
            rules={[{ required: true, message: "Please input stream_id" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="va_id"
            name="va_id"
            rules={[{ required: true, message: "Please input va_id" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="age"
            name="age"
            rules={[{ required: true, message: "Please input age"}]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Select.Option value={1}>male</Select.Option>
              <Select.Option value={0}>female</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="mask"
            name="mask"
            rules={[{ required: true, message: "Please select mask" }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Select.Option value={1}>mask</Select.Option>
              <Select.Option value={0}>no mask</Select.Option>
            </Select>
          </Form.Item>
          <Button className="bg-[#1677ff]" type="primary" htmlType="submit">
            Add new list
          </Button>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default AddList;
