import { Button, TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeOut } from "../../../store/faceDetection/thunkAction";

const TimeDetail = (props) => {
  const [timeOut, setTimeOut] = useState("00:00:00");
  const { timeDetail, loading } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  console.log(timeDetail);
  const checkTimeOut = () => {
    if (timeDetail?.check_out === "00:00") {
      return false;
    } else if (timeDetail?.check_out !== "00:00") {
      return true;
    }
  };
  const onChange = (time, timeString) => {
    setTimeOut(timeString);
  };

  const updateCheckOut = () => {
    const data = {
      list_id: timeDetail?.list_id,
      list_item_id: timeDetail?.id,
      stream_id: timeDetail?.stream_id,
      va_id: timeDetail?.va_id,
      gender: timeDetail?.gender,
      created_at: props.date + timeOut,
    };
    dispatch(updateTimeOut(data));
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center name-detail">
          Name :{" "}
          <input
            type="text"
            id="name"
            className="w-2/3 rounded-md ml-4"
            disabled
            defaultValue={timeDetail?.name}
          />
        </div>
        <div className="flex items-center justify-between mt-4 mail-detail">
          <div className="flex items-center">
            Email:{" "}
            <input
              type="text"
              id="email"
              className="w-2/3 rounded-md ml-2"
              disabled
              defaultValue={timeDetail?.comment}
            />{" "}
          </div>
          <div className="flex items-center">
            Gender:{" "}
            <input
              type="text"
              id="email"
              className="w-1/3 rounded-md ml-2"
              disabled
              defaultValue={(() => {
                if (timeDetail?.gender === 1) {
                  return "Male";
                } else if (timeDetail?.gender === 0) {
                  return "Female";
                }
              })()}
            />{" "}
          </div>
        </div>
        <div className="time-picker flex items-center justify-around mt-4">
          <div className="check-in">
            {loading ? (
              <TimePicker
                onChange={onChange}
                defaultValue={dayjs(timeDetail?.check_in, "HH:mm")}
                disabled={true}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="check-out">
            {loading ? (
              <TimePicker
                onChange={onChange}
                defaultValue={dayjs(timeDetail?.check_out, "HH:mm")}
                disabled={checkTimeOut()}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="mt-4 w-fit ml-auto ">
          {checkTimeOut() ? (
            <div className=""> ''</div>
          ) : (
            <Button
              type="primary"
              className="bg-[#1677ff]"
              onClick={() => {
                updateCheckOut();
              }}
            >
              Update
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TimeDetail;
