import {
  CloseOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import "./FormSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCamera } from "../../store/faceDetection/thunkAction";
const FormSearchAlertList = (props) => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  const { setName, setStreamId, setTimeId } = props;
  const [form] = Form.useForm();
  //get all camera
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  // schedule option
  const schedulesOption = [
    {
      value: 1,
      label: "Sunday",
      disabled: false,
    },
    {
      value: 2,
      label: "Monsday",
      disabled: false,
    },
    {
      value: 3,
      label: "Tuesday",
      disabled: false,
    },
    {
      value: 4,
      label: "Wedsnday",
      disabled: false,
    },
    {
      value: 5,
      label: "Thursday",
      disabled: false,
    },
    {
      value: 6,
      label: "Friday",
      disabled: false,
    },
    {
      value: 7,
      label: "Saturday",
      disabled: false,
    },
  ];
  return (
    <>
      <div className="Container__Form">
        <h2 className="formSearch__title">Trigger List</h2>
        <div className="Content__Form">
          <Form form={form} layout="inline">
            {/* input search email */}
            <Form.Item name='notification' style={{ marginInlineEnd: "5px" }}>
              <Input
                allowClear={{
                  clearIcon: <CloseOutlined />,
                }}
                placeholder="search notification..."
                prefix={<UserOutlined />}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Item>
            {/* Select camera */}
            <Form.Item name='camera' style={{ marginInlineEnd: "5px" }}>
              <Select
                style={{ minWidth: "200px" }}
                showSearch
                placeholder="Search camera"
                optionFilterProp="children"
                mode="multiple"
                maxTagCount="responsive"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={cameraList?.map((item) => {
                  return { value: item.id, label: item.name };
                })}
                onChange={(value) => {
                  setStreamId(value);
                }}
              />
            </Form.Item>
            {/* Select date */}
            <Form.Item name='time' style={{ marginInlineEnd: "5px"}}>
              <Select
                mode="multiple"
                style={{ minWidth: "200px" }}
                showSearch
                placeholder="search date"
                optionFilterProp="children"
                maxTagCount="responsive"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={schedulesOption}
                onChange={(value) => {
                  setTimeId(value);
                }}
              />
            </Form.Item>
            <Button
              title="claer data"
              className="ButtonCustom DeleteBtn"
              icon={<CloseOutlined />}
              onClick={() => {
                form.resetFields();
                setName("");
                setStreamId([]);
                setTimeId([]);
              }}
            ></Button>
          </Form>

          <Button
            title="Add trigger"
            className="ButtonCustom AddBtn"
            icon={<PlusOutlined />}
          />
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

export default FormSearchAlertList;
