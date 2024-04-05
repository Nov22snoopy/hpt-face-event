import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOffList,
} from "../../../store/faceDetection/thunkAction";
import { ConfigProvider, Table, Tag } from "antd";
import moment from "moment";
import faceImage from "../../../assests/img/user-img.jpg";
import "./offList.css";

const OffList = () => {
  const { offList } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  //Dispatch action get up list from store//
  //************************************* */
  useEffect(() => {
    dispatch(getOffList());
  }, [dispatch]);
  //Data for table//
  //************************************* */
  const columns = [
    //column Image//
    //**************/
    {
      title: "Image",
      dataIndex: "image, id",
      key: "image",
      render: (_, { face_image, id }) => (
        <div key={id}>
          <img src={faceImage} className="size-28" alt="face_img" />
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
      key: "mask",
      render: (_, { mask, id }) => <div key={id}>{mask.data}</div>,
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
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "grey",
              itemInputBg: "grey",
              colorText: "white"
            },
            Table: {
              headerColor	:'white',
              headerSplitColor:	'rgb(42 43 47)',
              borderColor:"rgb(108 114 147)",
              fontFamily: '"Roboto, sans-serif"'
              
              
            }
          },
          token:{
            colorBgContainer:'rgb(42 43 47)',
            colorText:'rgb(108 114 147)',
            fontSize:'18px',
            fontWeightStrong: '24px'
          }
          
        }}
      >
        <Table
          dataSource={offList}
          rowKey={(record) => record.id}
          columns={columns}
          style={{
            backgroundColor: 'rgb(42 43 47)',
            borderRadius:'10px',
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default OffList;
