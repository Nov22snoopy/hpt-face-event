import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker } from "antd";
import React from "react";
import "./FormSearch.css";
import dayjs from "dayjs";
import Search from "../../component/search/Search";
import SelectList from "../../component/selectList/SelectList";

const FormSearchTimekeeping = ({ today, setDate }) => {
  //change date data for searching by date
  const onChange = (d, dateString) => {
    setDate(dateString);
  };
  //option select group

  return (
    <div className="Container__Form">
      <h2 className="formSearch__title">Time Sheet</h2>
      <div className="Content__Form">
        {/* input search email */}
        <Search/>
        {/* Select date */}
        <DatePicker
          allowClear={false}
          defaultValue={dayjs(today)}
          onChange={onChange}
        />
        {/* Select group */}
        <SelectList/>
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

export default FormSearchTimekeeping;
