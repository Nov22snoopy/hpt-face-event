import { CheckOutlined } from "@ant-design/icons";
import { Switch, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SwitchCheck = (props) => {
  const { updateNotification } = useSelector(
    (state) => state.NotificationService
  );
  const [value, setValue] = useState(Boolean);
  const dispatch = useDispatch();
  //set default check value
  useEffect(() => {
    const checkValue = async()=>{
      const checkStatus = await props.status
      if (checkStatus) {
        if (checkStatus === '0') {
          console.log('haha');
          setValue(false);
        }
        else {
          console.log("object");
          setValue(true);
        }
      }
    }
    checkValue()
  }, [props.status]);
  //get notification detail

  const onSwitch = (check) => {
    setValue(check);
    const data = {
      id: props.id,
      status: props.status,
    };
    if (!value) {
      data.status = 1;
    } else if (value) {
      data.status = 0;
    }
    dispatch(props.action(data));
  };
  return (
    <div>
      <span className="mx-2">
        {" "}
        {value ? <Tag color="success">On</Tag> : <Tag color="red">Off</Tag>}
      </span>
      <Switch
        disabled={updateNotification ? false : true}
        loading={updateNotification ? false : true}
        checkedChildren={<CheckOutlined />}
        onChange={onSwitch}
        value={value}
      />
    </div>
  );
};

export default SwitchCheck;
