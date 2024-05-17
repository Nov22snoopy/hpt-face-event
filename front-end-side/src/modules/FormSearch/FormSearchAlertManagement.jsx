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
const FormSearchAlertManagement = (props) => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const { setName, setStreamId, setTimeId, openModal } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //get all camera
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  // schedule option
  const schedulesOption = [
    {
      value: 0,
      label: "Sunday",
      disabled: false,
    },
    {
      value: 1,
      label: "Monsday",
      disabled: false,
    },
    {
      value: 2,
      label: "Tuesday",
      disabled: false,
    },
    {
      value: 3,
      label: "Wedsnday",
      disabled: false,
    },
    {
      value: 4,
      label: "Thursday",
      disabled: false,
    },
    {
      value: 5,
      label: "Friday",
      disabled: false,
    },
    {
      value: 6,
      label: "Saturday",
      disabled: false,
    },
  ];
  return (
    <>
      <div className="Container__Form">
        <h2 className="formSearch__title">Trigger Management</h2>
        <div className="Content__Form">
          <Form  form={form} layout="inline">
            {/* input search email */}
            <Form.Item style={{marginInlineEnd: '5px'}} name='notification'>
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
            <Form.Item style={{marginInlineEnd: '5px'}}  name='camera'>
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
            <Form.Item  style={{marginInlineEnd: '5px'}}  name='time'>
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
                  setTimeId(value.sort().toString());
                }}
              />
            </Form.Item>
            <Button
              title="claer data"
              className="ButtonCustom DeleteBtn"
              icon={<CloseOutlined />}
              onClick={() => {
                form.resetFields();
                setName('')
                setStreamId([])
                setTimeId('')
              }}
            ></Button>
          </Form>

          <Button
            title="Add trigger"
            className="ButtonCustom AddBtn"
            icon={<PlusOutlined />}
            onClick={() => {
              openModal();
            }}
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

export default FormSearchAlertManagement;
