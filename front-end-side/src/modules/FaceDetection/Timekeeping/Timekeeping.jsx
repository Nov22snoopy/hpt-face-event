import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListByDate,
  getTimeDetail,
  getTimeLineDetail,
} from "../../../store/faceDetection/thunkAction";
import faceImage from "../../../assests/img/user-img.jpg";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import TimeDetail from "./TimeDetail";
import dayjs from "dayjs";
import moment from "moment";
import FormSearchTimekeeping from "../../FormSearch/FormSearchTimekeeping";
import TimeLine from "./TimeLine";
import { faceDetectionActions } from "../../../store/faceDetection/slice";
const Timekeeping = () => {
  const currentDate = new Date().toDateString();
  const today = moment(dayjs(currentDate)).format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const [openTimeLine, setOpenTimeLine] = useState(false);
  const { allListByDate, listId, searchEmail, updating } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();

  //set intial data for table
  useEffect(() => {
    if (!listId || listId === 0) {
      dispatch(getAllListByDate({ date: date }));
    } else if (listId && listId !== 0 && !searchEmail) {
      dispatch(getAllListByDate({ date: date, list_id: listId }));
    } else if (listId && searchEmail) {
      dispatch(
        getAllListByDate({ date: date, email: searchEmail, list_id: listId })
      );
    }
    setModalOpen(false);
  }, [dispatch, date, listId, searchEmail, updating]);
  // set date
  //******* */
  // set collumn for table
  //******************* */
  const columns = [
    //column Image//
    //**************/
    //(image from camera)//
    {
      title: "Image",
      dataIndex: "image, id",
      key: "image",
      fixed: "left",
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
      fixed: "left",
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
    //column Check in//
    //**************/
    {
      title: "Check in",
      dataIndex: "checkIn, id",
      key: "checkIn",
      render: (_, { check_in, id }) => (
        <Tag key={id} color="success">
          {(() => {
            const time = check_in?.split(":");
            return time[0] + "h" + time[1] + "m";
          })()}
        </Tag>
      ),
    },
    //column Camera check in//
    //**************/
    {
      title: "Camera in",
      dataIndex: "cameraIn, id",
      key: "cameraIn",
      render: (_, { camera_in, id }) => (
        <Tag key={id} color="blue">
          camera: {camera_in}
        </Tag>
      ),
    },
    //collumn check out//
    //**************** */
    {
      title: "Check out",
      dataIndex: "checkOut, id",
      key: "checkOut",
      render: (_, { check_out, id }) => (
        <Tag key={id} color="error">
          {(() => {
            const time = check_out?.split(":");
            return time[0] + "h" + time[1] + "m";
          })()}{" "}
        </Tag>
      ),
    },
    //column camera check out//
    //**************/
    {
      title: "Camera out",
      dataIndex: "cameraOut",
      key: "cameraOut",
      render: (_, { camera_out, id }) => (
        <Tag key={id} color="blue">
          camera: {camera_out}
        </Tag>
      ),
    },

    //collumn Total time//
    //**************** */
    {
      title: "Total time ",
      dataIndex: "totaltime",
      key: "totaltime",
      render: (_, { totaltime, id }) => (
        <div className="text-center" key={id}>
          {/* {(() => {
            const time = totaltime.split(".");
            if (Number(totaltime) > 8) {
              return (
                <Tag color="purple">{time[0] + "h" + time[1] * 6 + "m"} </Tag>
              );
            }
            if (Number(totaltime) < 8 && Number(totaltime) > 0) {
              return (
                <Tag color="warning">{time[0] + "h" + time[1] * 6 + "m"} </Tag>
              );
            }
            if (Number(totaltime) === 8) {
              return (
                <Tag color="success">{time[0] + "h" + time[1] * 6 + "m"} </Tag>
              );
            }
            if (Number(totaltime) === 0) {
              return (
                <Tag color="red">{time[0] + "h" + time[1] * 6 + "m"} </Tag>
              );
            }
          })()} */}{totaltime + 'm'}
        </div>
      ),
    },
    //collumn check
    //************ */
    {
      title: "Check",
      dataIndex: "check",
      key: "check",
      render: (_, { check_in, check_out, id }) => (
        <div key={id}>
          <div className="arrive">
            {(() => {
              const timeIn = check_in.split(":");
              if (
                Number(timeIn[0]) * 60 * 60 + Number(timeIn[1]) * 60 >
                30600
              ) {
                let time =
                  (Number(timeIn[0]) * 60 * 60 +
                    Number(timeIn[1]) * 60 -
                    (8 * 60 * 60 + 30 * 60)) /
                  60;
                return (
                  <Tag color="warning">
                    Arrive late:{" "}
                    {(time / 60).toFixed(0) + "h" + (time % 60) + "m"}
                  </Tag>
                );
              }
            })()}
          </div>
          <div className="leave mt-2">
            {(() => {
              const timeOut = check_out.split(":");
              if (
                Number(timeOut[0]) * 60 * 60 + Number(timeOut[1]) * 60 <
                62100
              ) {
                let time =
                  (17 * 60 * 60 -
                    (Number(timeOut[0]) * 60 * 60 + Number(timeOut[1]) * 60)) /
                  60;
                return (
                  <Tag color="error">
                    Leave soon:{" "}
                    {(time / 60).toFixed(0) + "h" + (time % 60) + "m"}
                  </Tag>
                );
              }
            })()}
          </div>
        </div>
      ),
    },
    //collumn action time//
    //**************** */
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: "100px",
      render: (_, { id }) => (
        <div key={id}>
          <button
            className="edit text-lg mx-1 text-blue-600 hover:shadow-md hover:bg-blue-100 rounded transition-all px-1"
            onClick={() => {
              setOpenTimeLine(true);
              dispatch(getTimeLineDetail({ id: id, date: date }));
            }}
          >
            {" "}
            <EyeOutlined />
          </button>
          <button
            className="edit text-lg mx-1 text-green-600 hover:shadow-md hover:bg-green-100 rounded transition-all px-1"
            onClick={() => {
              setModalOpen(true);
              dispatch(getTimeDetail({ id: id, date: date }));
            }}
          >
            <EditOutlined />
          </button>
        </div>
      ),
    },
  ];
  // console.log(allListByDate);
  return (
    <div className="container">
      <div className="form-search">
        <FormSearchTimekeeping
          date={date}
          today={currentDate}
          setDate={setDate}
        />
      </div>
      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {},
            Table: {
              borderColor: "rgb(108 114 147)",
              fontFamily: '"Roboto, sans-serif"',
              fontSize: "16px",
            },
          },
          token: {
            colorText: "rgb(108 114 147)",
            fontWeightStrong: "20px",
          },
        }}
      >
        <Table
          dataSource={allListByDate}
          rowKey={(record) => record.id}
          columns={columns}
          style={{
            borderRadius: "10px",
          }}
          scroll={{
            x: 1300,
            y: 750,
          }}
        />
      </ConfigProvider>
      {/* Modal detail */}
      <Modal
        title="Check time detail"
        centered
        open={modalOpen}
        width={650}
        onCancel={() => {
          setModalOpen(false);
          dispatch(faceDetectionActions.clearTimeDetail())
        }}
        footer={null}
      >
        <TimeDetail date={date} openModal={setModalOpen}  />
      </Modal>
      {/* Modal time line */}
      <Modal
        title="Check time line"
        centered
        open={openTimeLine}
        onCancel={() => {
          setOpenTimeLine(false);
        }}
        width={550}
        footer={null}
      >
        <TimeLine date={date} />
      </Modal>
    </div>
  );
};

export default Timekeeping;
