import React, { useState } from "react";
import "./indexPage.css";
import { Card, DatePicker, Select } from "antd";
import {
  AlertOutlined,
  MehOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import CameraIdentify from "../Chart/Camera/CameraIdentify";
import CameraFaceEvent from "../Chart/Camera/CameraFaceEvent";
import CameraPoseEvent from "../Chart/Camera/CameraPoseEvent";
import IdentifyChart from "../Chart/Identify/IdentifyChart";
import FaceWarningChart from "../Chart/FaceWarning/FaceWarningChart";
import PoseWarningChart from "../Chart/PoseWarning/PoseWarningChart";
const IndexPage = () => {
  const [event, setEvent] = useState(["identify"]);
  const [date, setDate] = useState("");
  console.log(event);
  const onDateChange = (date, dateString) => {
    setDate(dateString);
  };
  // const { Meta } = Card;
  return (
    <div className="dashbroad">
      <div className="dashbroad__content my-4">
        <div className="container">
          <div className="row">
            {/* camera */}
            <div className="camera col-12 col-md-6 col-xl-3">
              <Card
                className="dashbroad_card"
                title={
                  <div
                    style={{ color: "#624bff" }}
                    className="text-lg flex justify-between items-center"
                  >
                    <span>Camera</span>
                    <span className="icon">
                      <VideoCameraOutlined />
                    </span>
                  </div>
                }
                style={{
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                }}
                hoverable
              >
                <div className="text-center">
                  <p className="text-4xl font-semibold">7</p>
                </div>
              </Card>
            </div>
            {/* identify */}
            <div className="identify col-12 col-md-6 col-xl-3">
              <Card
                className="dashbroad_card"
                title={
                  <div
                    style={{ color: "#624bff" }}
                    className="text-lg flex justify-between items-center"
                  >
                    <span>Identify</span>
                    <span className="icon">
                      <MehOutlined />
                    </span>
                  </div>
                }
                style={{
                  backgroundColor: "rgba(54, 162, 235, 0.2)",
                }}
                hoverable
              >
                <div className="text-center">
                  <p className="text-4xl font-semibold">7</p>
                </div>
              </Card>
            </div>
            {/* warning face */}
            <div className="face_warning col-12 col-md-6 col-xl-3">
              <Card
                className="dashbroad_card"
                title={
                  <div
                    style={{ color: "#624bff" }}
                    className="text-lg flex justify-between items-center"
                  >
                    <span>Face warning</span>
                    <span className="icon">
                      <AlertOutlined />
                    </span>
                  </div>
                }
                style={{
                  backgroundColor: "rgba(255, 206, 86, 0.2)",
                }}
                hoverable
              >
                <div className="text-center">
                  <p className="text-4xl font-semibold">7</p>
                </div>
              </Card>
            </div>
            {/* warning pose */}
            <div className="pose_warning col-12 col-md-6 col-xl-3">
              <Card
                className="dashbroad_card"
                title={
                  <div
                    style={{ color: "#624bff" }}
                    className="text-lg flex justify-between items-center"
                  >
                    <span>Pose warning</span>
                    <span className="icon">
                      <AlertOutlined />
                    </span>
                  </div>
                }
                style={{
                  backgroundColor: "rgba(255, 159, 64, 0.2)",
                }}
                hoverable
              >
                <div className="text-center">
                  <p className="text-4xl font-semibold">7</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="dashbroad_chart mt-5 ">
          <div className="select_chart flex justify-start items-center gap-2">
            <Select
              defaultValue="identify"
              style={{ minWidth: "200px" }}
              showSearch
              placeholder="Select..."
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
              options={[
                { value: "identify", label: "Identify" },
                {
                  value: "faceWarning",
                  label: "Face warning",
                },
                {
                  value: "poseWarning",
                  label: "Pose warning",
                },
              ]}
              onChange={(value) => {
                setEvent(value);
              }}
            />
            <DatePicker allowClear onChange={onDateChange} />
          </div>
          <hr className="my-4" />
          <div className="chart container-fluid">
            {event.find((item) => item === "identify") !== undefined ? (
              <div className="identify_chart row mt-3">
                <div className="col-12 col-lg-8">
                  <CameraIdentify date={date} />
                </div>
                <div className="col-12 col-lg-4"><IdentifyChart date={date}/></div>
              </div>
            ) : null}
            {event.find((item) => item === "faceWarning") !== undefined ? (
              <div className="face_warning_chart row mt-3">
                <div className="col-12 col-lg-8">
                  <CameraFaceEvent date={date} />
                </div>
                <div className="col-12 col-lg-4"><FaceWarningChart date={date}/></div>
              </div>
            ) : null}
            {event.find((item) => item === "poseWarning") !== undefined ? (
              <div className="pose_warning_chart row mt-3">
                <div className="col-12 col-lg-8">
                  <CameraPoseEvent date={date} />
                </div>
                <div className="col-12 col-lg-4"><PoseWarningChart date ={date}/></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
