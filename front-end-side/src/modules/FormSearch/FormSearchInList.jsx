import {
  CloseOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFace } from "../../store/faceDetection/thunkAction";

const FormSearchInList = (props) => {
  const { listFace } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  const { setEmail, setListId } = props;
  //get face list
  useEffect(() => {
    dispatch(getListFace());
  }, [dispatch]);
  //set form
  const [form] = Form.useForm();

  return (
    <>
      <div className="Container__Form">
        <h2 className="formSearch__title">In List</h2>
        <div className="Content__Form">
          <Form form={form} layout="inline">
            {/* input search email */}
            <Form.Item style={{ marginInlineEnd: "5px" }} name='email'>
              <Input
                allowClear={{
                  clearIcon: <CloseOutlined />,
                }}
                placeholder="search email..."
                prefix={<UserOutlined />}
                enterbutton="true"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            {/* Select group */}
            <Form.Item style={{ marginInlineEnd: "5px" }} name='group'>
              <Select
                style={{ minWidth: "200px" }}
                showSearch
                placeholder="Search group"
                optionFilterProp="children"
                mode="multiple"
                maxTagCount="responsive"
                options={listFace?.map((item) => {
                  return { label: item.name, value: item.id };
                })}
                onChange={(value) => {
                  setListId(value);
                }}
              />
            </Form.Item>
            <Button
              title="claer data"
              className="ButtonCustom DeleteBtn"
              icon={<CloseOutlined />}
              onClick={() => {
                form.resetFields();
                setEmail("");
                setListId([]);
              }}
            ></Button>
          </Form>
          <Button
            title="Refresh data"
            className="ButtonCustom DetailBtn"
            icon={<ReloadOutlined />}
          ></Button>
        </div>
      </div>
      <hr className="my-3" />
    </>
  );
};

export default FormSearchInList;
