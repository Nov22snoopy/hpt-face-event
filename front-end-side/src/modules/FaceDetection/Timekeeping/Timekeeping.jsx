import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListByDate,
  getTimeDetail,
} from "../../../store/faceDetection/thunkAction";
import faceImage from "../../../assests/img/user-img.jpg";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import TimeDetail from "./TimeDetail";
import dayjs from "dayjs";
import moment from "moment";
import FormSearchTimekeeping from "../../FormSearch/FormSearchTimekeeping";
const Timekeeping = () => {
  const currentDate = new Date().toDateString();
  const today = moment(dayjs(currentDate)).format("YYYY-MM-DD");
  const [date, setDate] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const { allListByDate, listId, searchEmail } = useSelector(
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
  }, [dispatch, date, listId, searchEmail]);
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
          {check_in}
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
          {check_out}
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
          {(() => {
            if (Number(totaltime) > 8) {
              return <Tag color="purple">{totaltime} </Tag>;
            }
            if (Number(totaltime) < 8 && Number(totaltime) > 0) {
              return <Tag color="warning">{totaltime} </Tag>;
            }
            if (Number(totaltime) === 8) {
              return <Tag color="success">{totaltime} </Tag>;
            }
            if (Number(totaltime) === 0) {
              return <Tag color="red">{totaltime} </Tag>;
            }
          })()}
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
                    {" "}
                    late: {(time / 60).toFixed(0) + "h" + (time % 60) + "m"}
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
                    soon: {(time / 60).toFixed(0) + "h" + (time % 60) + "m"}
                  </Tag>
                );
              }
            })()}
          </div>
        </div>
      ),
    },
    //collumn search status
    //************ */
    {
      title: "Search",
      dataIndex: "search",
      key: "search",
    },
    //collumn Edit time//
    //**************** */
    {
      title: "Update time",
      dataIndex: "udpate_time",
      key: "update_time",
      fixed: 'right',
      render: (_, { id }) => (
        <div key={id}>
          <button
            className="btn btn-primary"
            onClick={() => {
              setModalOpen(true);
              dispatch(getTimeDetail({ id: id, date: date }));
            }}
          >
            Edit
          </button>
        </div>
      ),
    },
  ];
  // console.log(allListByDate);
  return (
    <div className="container">
      <div className="form-search">
        <FormSearchTimekeeping date={date} today={currentDate} setDate={setDate}/>
      </div>
      {/* Table */}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
            },
            Table: {
              borderColor: "rgb(108 114 147)",
              fontFamily: '"Roboto, sans-serif"',
              fontSize: '16px',
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
            y: 750
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
        footer={null}
      >
        <TimeDetail date={date} />
      </Modal>
    </div>
  );
};

export default Timekeeping;
