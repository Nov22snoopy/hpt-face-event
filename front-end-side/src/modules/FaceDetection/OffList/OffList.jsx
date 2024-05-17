import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffList } from "../../../store/faceDetection/thunkAction";
import { ConfigProvider, Table, Tag } from "antd";
import moment from "moment";
import faceImage from "../../../assests/img/user-img.jpg";
import "./offList.css";
import { io } from "socket.io-client";
import FormSearchOutList from "../../FormSearch/FormSearchOutList";
const socket = io("http://localhost:8080");
const OffList = () => {
  const [newList, setNewList] = useState();
  const [date, setDate] = useState('')
  const [streamId, setStreamId] = useState([])
  const { offList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  //Dispatch action get up list from store//
  //************************************* */
  useEffect(() => {
    dispatch(getOffList({date:date, streamId:streamId}));
  }, [dispatch, newList, date, streamId]);
  //socket
  useEffect(() => {
    socket.on("addList", (value) => {
      setNewList(value);
    });
  });
  //Data for table//
  //************************************* */
  const columns = [
    //column Image//
    //**************/
    {
      title: "Image",
      dataIndex: "image, id",
      key: "image",
      render: (_, { id }) => (
        <div key={id}>
          <img src={faceImage} className="size-32" alt="face_img" />
        </div>
      ),
      //column Camera//
      //**************/
    },
    {
      title: "Camera",
      dataIndex: "camera, id",
      key: "camera",
      render: (_, { camera, id }) => <div key={id}>{camera}</div>,
    },
    //column Age//
    //**************/
    {
      title: "Age",
      dataIndex: "age, id",
      key: "age",
      render: (_, { age, id }) => <div key={id}>{age}</div>,
    },
    //column Gender//
    //**************/
    {
      title: "Gender",
      dataIndex: "gender, id",
      key: "gender",
      render: (_, { gender, id }) => (
        <div key={id}>
          {(() => {
            if (gender === 1) {
              return (
                <Tag color="blue" className="">
                  Male
                </Tag>
              );
            } else if (gender === 0) {
              return (
                <Tag color="magenta" className="">
                  Female
                </Tag>
              );
            }
          })()}
        </div>
      ),
    },
    //column Mask//
    //**************/
    {
      title: "Mask",
      dataIndex: "mask, id",
      width: 150,
      key: "mask",
      render: (_, { mask, id }) => (
        <div key={id}>
          {mask?.data.toString("hex") === "1" ? "Mask" : "No mask"}
        </div>
      ),
    },
    //column Create_at//
    //**************/
    {
      title: "Created_at",
      dataIndex: "created_at, id",
      key: "created_at",
      render: (_, { created_at, id }) => (
        <div key={id}>
          {(() => {
            return (
              <Tag>{moment(created_at).format("DD/MM/YYYY HH:mm:ss")}</Tag>
            );
          })()}
        </div>
      ),
    },
  ];
  return (
    <div className="container off-list">
      <div className="form-search">
        <FormSearchOutList setDate={setDate} setStreamId= {setStreamId}/>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {},
            Table: {},
          },
          token: {
            colorText: "rgb(108 114 147)",
            fontSize: "16px",
            fontWeightStrong: "24px",
          },
        }}
      >
        <Table
          dataSource={offList ? offList : []}
          rowKey={(record) => record.id}
          columns={columns}
          style={{
            borderRadius: "10px",
          }}
          scroll={{
            y: 800,
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OffList;
