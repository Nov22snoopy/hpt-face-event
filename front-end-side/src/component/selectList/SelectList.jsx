import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListFace } from "../../store/faceDetection/thunkAction";
import { faceDetectionActions } from "../../store/faceDetection/slice";
import { Select } from "antd";

const SelectList = (props) => {
  const { listFace, listId } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  //get list face id
  useEffect(() => {
    dispatch(getListFace());
  }, [dispatch]);

  const options = [
    { key: 0, value: 0, label: <div className="">select group</div> },
  ];
  const setOption = () => {
    if (listFace) {
      for (let i = 0; i < listFace?.length; i++) {
        options.push({
          key: i + 1,
          value: listFace[i].id,
          label: listFace[i].name,
        });
      }
    }
  };
  return (
    <>
      {setOption()}
      <Select
        size="default"
        placeholder="Select group"
        placement="bottomLeft"
        value={listId?listId:null}
        style={{ width: "200px" }}
        options={options}
        onSelect={(value, index) => {
          if (value === 0) value = null
          dispatch(faceDetectionActions.selectList(Number(value)));
          dispatch(faceDetectionActions.clearSearch());
          console.log(value);
        }}
      />
    </>
  );
};

export default SelectList;
