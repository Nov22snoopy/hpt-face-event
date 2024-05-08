import {
  CloseOutlined,
  PlusOutlined,
  ReloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import React, { useEffect } from "react";
import "./FormSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modals/slice";
import { getAllCamera } from "../../store/faceDetection/thunkAction";
const FormSearchAlertList = (props) => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  const { setName, setStreamId, setTimeId } = props;
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
    <div className="Container__Form">
      <h2 className="formSearch__title">Trigger List</h2>
      <div className="Content__Form">
        {/* input search email */}
        <Input
          className="w-1/3"
          allowClear={{
            clearIcon: <CloseOutlined />,
          }}
          placeholder="search email..."
          prefix={<UserOutlined />}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* Select camera */}
        <Select
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
        {/* Select date */}
        <Select
          mode="multiple"
          style={{ minWidth: "150px" }}
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
        <Button
          title="Add trigger"
          className="ButtonCustom AddBtn"
          icon={<PlusOutlined />}
          onClick={() => {
            dispatch(modalActions.openForm());
          }}
        />
        <Button
          title="Refresh data"
          className="ButtonCustom DetailBtn"
          icon={<ReloadOutlined />}
        ></Button>
      </div>
    </div>
  );
};

export default FormSearchAlertList;
