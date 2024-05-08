import {
  CloseOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Select } from "antd";
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
  //set group option
  

  return (
    <div className="Container__Form">
      <h2 className="formSearch__title">In List</h2>
      <div className="Content__Form">
        {/* input search email */}
        <Input
          allowClear={{
            clearIcon: <CloseOutlined />,
          }}
          placeholder="search email..."
          prefix={<UserOutlined />}
          enterbutton="true"
          onChange={(e)=>{setEmail(e.target.value)}}
          className="w-1/2"
        />
        {/* Select group */}
        <Select
          showSearch
          placeholder="Search group"
          optionFilterProp="children"
          mode="multiple"
          maxTagCount="responsive"
          options={listFace?.map((item)=> {return{label: item.name, value: item.id}})}
          onChange={(value) => {
            setListId(value);
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
  );
};

export default FormSearchInList;
