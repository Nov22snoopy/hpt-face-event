import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Select } from "antd";
import React, { useEffect } from "react";
import "./FormSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCamera } from "../../store/faceDetection/thunkAction";
const FormSearchOutList = (props) => {
  const { cameraList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  const { setDate, setStreamId } = props;
  //change date data for searching by date
  const onChange = (d, dateString) => {
    setDate(dateString);
  };
  //get all camera
  useEffect(() => {
    dispatch(getAllCamera());
  }, [dispatch]);
  return (
    <>
      <div className="Container__Form">
        <h2 className="formSearch__title">Out List</h2>
        <div className="Content__Form">
          {/* input search email */}
          {/* Select date */}
          <DatePicker allowClear={true} onChange={onChange}  />
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
          <Button
            title="Search"
            className="ButtonCustom SearchBtn"
            icon={<SearchOutlined />}
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

export default FormSearchOutList;
