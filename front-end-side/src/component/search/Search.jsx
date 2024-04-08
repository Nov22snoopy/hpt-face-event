import React, { useRef } from "react";
import { AutoComplete, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllListByName } from "../../store/faceDetection/thunkAction";
const Search = () => {
  const searchList = useRef(null);
  const {allList} = useSelector(state => state.FaceDetectionService)
  const dispatch = useDispatch()
  return (
    <div>
      <AutoComplete
            popupMatchSelectWidth={252}
            style={{
              width: 300,
            }}
            options={allList?.map((item, index)=> {return {label: item.name, value: item.name}})}
            onSearch={(value) => {
              if(searchList.current){
                clearTimeout(searchList.current)
              }
              searchList.current = setTimeout(() => {
                dispatch(getAllListByName(value)) 
              }, 300);
            }}
          >
            <Input.Search placeholder="input here" enterButton />
          </AutoComplete>
    </div>
  );
};

export default Search;
