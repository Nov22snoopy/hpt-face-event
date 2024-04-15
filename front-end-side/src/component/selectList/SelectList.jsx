import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListByDate,
  getListFace,
} from "../../store/faceDetection/thunkAction";
import { faceDetectionActions } from "../../store/faceDetection/slice";

const SelectList = (props) => {
  const [value, setValue] = useState('');
  const { listFace, listId } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  //get list face id
  useEffect(() => {
    dispatch(getListFace());
  }, [dispatch]);
  //search by list
  useEffect(() => {
    dispatch(getAllListByDate({ date: props.date, list_id: Number(value) }));
    dispatch(faceDetectionActions.selectList(Number(value)));
  }, [dispatch, value, props.date]);
  return (
    <div>
      <select
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={listId?listId:''}
        className=""
      > <option value={0}></option>
        {listFace?.map((item, index) => {
          return (
            <option value={item.id} key={index + 1}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectList;
