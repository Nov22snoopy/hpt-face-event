import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Input, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllListByMail } from "../../store/faceDetection/thunkAction";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { faceDetectionActions } from "../../store/faceDetection/slice";

const Search = (props) => {
  const [value, setValue] = useState();
  const searchList = useRef(null);
  const { allList, listId, searchEmail } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  useEffect(()=>{
    if (!searchEmail){
      setValue('')
    }
  },[searchEmail])
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              /* here is your component tokens */
              optionActiveBg: "red",
            },
          },
        }}
      >
        <AutoComplete
          popupMatchSelectWidth={252}
          style={{
            width: 300,
          }}
          value={value}
          options={allList?.map((item, index) => {
            if (listId && listId !== 0) {
              return { label: item.email, value: item.email };
            } else {
              return {
                label: (
                  <div className="flex justify-between">
                    <span className="font-semibold">{item.email}</span>{" "}
                    <span className="font-semibold">{item.list}</span>
                  </div>
                ),
                value: [item.email, item.list_id],
              };
            }
          })}
          onSearch={(value) => {
            if (searchList.current) {
              clearTimeout(searchList.current);
            }
            searchList.current = setTimeout(() => {
              if (listId && listId !== 0) {
                dispatch(
                  getAllListByMail({
                    email: value,
                    list_id: Number(listId),
                  })
                );
              } else if (!listId || listId === 0) {
                dispatch(getAllListByMail({ email: value, list_id: " " }));
              }
            }, 300);
          }}
          onChange={(value) => {
            setValue(value);
          }}
          onSelect={(value) => {
            if (listId) setValue(value);
            if (!listId) setValue(value[0]);
            if (listId && listId !== 0) {
              dispatch(faceDetectionActions.searchEmail(value));
            } else if (!listId || listId === 0) {
              dispatch(faceDetectionActions.searchEmail(value[0]));
              dispatch(faceDetectionActions.selectList(Number(value[1])));
            }
          }}
          defaultActiveFirstOption
          trigger="click"
        >
          <Input
            allowClear={{
              clearIcon: (
                <CloseOutlined
                  onClick={() => {
                    dispatch(faceDetectionActions.clearSearch());
                  }}
                />
              ),
            }}
            size="default"
            placeholder="search email..."
            prefix={<UserOutlined />}
            enterbutton="true"
          />
        </AutoComplete>
      </ConfigProvider>
    </div>
  );
};

export default Search;
