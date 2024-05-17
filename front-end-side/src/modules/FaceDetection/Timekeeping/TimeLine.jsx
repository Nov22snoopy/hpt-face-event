import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const TimeLine = () => {
  const { timeLine } = useSelector((state) => state.FaceDetectionService);
  return (
    <div className="mt-4 ">
      <div className="mb-4 container flex justify-between text-[16px]">
        <h1 className="">
          {" "}
          <span className="font-semibold">Name: </span> <br />{" "}
          {timeLine ? timeLine[0].name : ""}
        </h1>
        <h1 className="">
          {" "}
          <span className="font-semibold">Email: </span> <br />{" "}
          {timeLine ? timeLine[0].email : ""}
        </h1>
        <h1 className="">
          {" "}
          <span className="font-semibold">Date: </span> <br />{" "}
          {timeLine ? moment(timeLine[0].created_at).format("DD-MM-YYYY") : ""}
        </h1>
      </div>
      <div className="pt-3 max-h-72  overflow-auto ">
        <Timeline
          mode="alternate"
          items={timeLine?.map((item, index) => {
            return {
              dot: (
                <ClockCircleOutlined
                  style={{
                    fontSize: "24px",
                    // backgroundColor: "#f1f5f9",
                  }}
                />
              ),
              color: index % 2 === 0 ? "green" : "red",
              children: (
                <div className="mx-2 text-lg">
                  <p>
                    {index % 2 === 0 ? (
                      <span className="font-semibold">Check in:</span>
                    ) : (
                      <span className="font-semibold">Check out:</span>
                    )}{" "}
                    Camera: {item.stream_id}{" "}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Time:</span>{" "}
                    <span>{moment(item.created_at).format("HH:mm:ss")}</span>
                  </p>
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default TimeLine;
