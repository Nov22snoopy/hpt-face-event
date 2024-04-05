import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListByDate, getTimeDetail } from "../../../store/faceDetection/thunkAction";
import faceImage from "../../../assests/img/user-img.jpg";
import { ConfigProvider, DatePicker, Modal, Table, Tag } from "antd";
import TimeDetail from "./TimeDetail";
import dayjs from "dayjs";
const Timekeeping = () => {
  const [date, setDate] = useState("2024-03-18")
  const [modalOpen, setModalOpen] = useState(false);
  const { allListByDate, updating } = useSelector((state) => state.FaceDetectionService);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllListByDate({ date: date }));
    setModalOpen(false)
  }, [dispatch, date, updating]);
  
  // set date
  //******* */
  const onChange = (d, dateString) => {
    setDate(dateString)
  }
  
  // set collumn for table
  //******************* */
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
    },
    //collumn name//
    //************//
    {
      title: "Name",
      dataIndex: "name, id",
      key: "name",
      render: (_, { name, id }) => <div key={id}>{name}</div>,
    },
    //collumn email//
    //************//
    {
      title: "Email",
      dataIndex: "comment, id",
      key: "comment",
      render: (_, { comment, id }) => <div key={id}>{comment}</div>,
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

    //column Timekeeping//
    //**************/
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      render: (_, { timekeeping, over_time, id }) => (
        <div key={id}>
          {(() => {
            if (Number(timekeeping === 0)) {
              return <Tag color="success">Fulltime</Tag>;
            }
            if (Number(timekeeping) < 0 && Number(over_time) < 0) {
              return <Tag color="warning">Leave soon</Tag>;
            }
            if (Number(timekeeping) > 0 || Number(over_time) > 0) {
              return <Tag color="purple">Over time</Tag>;
            }
          })()}
        </div>
      ),
    },

    //collumn Over time//
    //**************** */
    {
      title: "Over time ",
      dataIndex: "overtime",
      key: "overtime",
      render: (_, { timekeeping, over_time, id }) => (
        <div key={id}>
          {(() => {
            if (Number(timekeeping) < 0 && Number(over_time) < 0) {
              return <Tag color="purple">None</Tag>;
            }
            if (Number(timekeeping) > 0 || Number(over_time) > 0) {
              if (Number(timekeeping) > 0) {
                return (
                  <Tag color="purple">
                    {(timekeeping / 1).toFixed(0) +
                      "H:" +
                      ((timekeeping % 1) * 10 * 6).toFixed(0) +
                      "m"}
                  </Tag>
                );
              } else if (Number(timekeeping) < 0) {
                return (
                  <Tag color="purple">
                    {(over_time / 1).toFixed(0) +
                      "H:" +
                      ((over_time % 1) * 10 * 6).toFixed(0) +
                      "m"}
                  </Tag>
                );
              }
            }
          })()}
        </div>
      ),
    },
    //collumn Edit time//
    //**************** */
    {
      title: "Update time",
      dataIndex: "udpate_time",
      key: "update_time",
      render: (_, { id }) => (
        <div key={id}>
          <button
            className="btn btn-primary"
            onClick={() => {
              setModalOpen(true);
              dispatch(getTimeDetail({id: id, date: date}))
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="date-picker w-fit my-10 ml-auto md:mr-20">
        <ConfigProvider
         theme={{
          components: {
            DatePicker: {
              /* here is your component tokens */
              cellHoverBg	: 'white'
            },
          },
          token:{
            colorBgElevated	:'rgb(42 43 47)',
            colorIcon	: 'rgb(108 114 147)',
            colorText: 'rgb(108 114 147)'
          }
        }}>
          <DatePicker
            style={{
              backgroundColor: "rgb(42 43 47)",
              color: "rgb(108 114 147)",
              width: '150%',
              height: '150%'
            }}
            defaultValue={dayjs("2024-03-18")}
            onChange={onChange}
          />
        </ConfigProvider>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "grey",
              itemInputBg: "grey",
              colorText: "white",
            },
            Table: {
              headerColor: "white",
              headerSplitColor: "rgb(42 43 47)",
              borderColor: "rgb(108 114 147)",
              fontFamily: '"Roboto, sans-serif"',
            },
          },
          token: {
            colorBgContainer: "rgb(42 43 47)",
            colorText: "rgb(108 114 147)",
            fontSize: "18px",
            fontWeightStrong: "24px",
          },
        }}
      >
        <Table
          dataSource={allListByDate}
          rowKey={(record) => record.id}
          columns={columns}
          style={{
            backgroundColor: "rgb(42 43 47)",
            borderRadius: "10px",
          }}
        />
      </ConfigProvider>
      {/* Modal detail */}
      <Modal
        title="Check time detail"
        centered
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer = {null}
      >
        <TimeDetail />
      </Modal>
    </div>
  );
};

export default Timekeeping;
