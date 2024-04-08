import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListByDate,
  getTimeDetail,
} from "../../../store/faceDetection/thunkAction";
import faceImage from "../../../assests/img/user-img.jpg";
import {
  ConfigProvider,
  DatePicker,
  Modal,
  Table,
  Tag,
  AutoComplete,
  Input,
} from "antd";
import TimeDetail from "./TimeDetail";
import dayjs from "dayjs";
import Search from "../../../component/search/Search";
const Timekeeping = () => {
  const [options, setOptions] = useState([]);
  const [date, setDate] = useState("2024-03-18");
  const [modalOpen, setModalOpen] = useState(false);
  const { allListByDate, updating } = useSelector(
    (state) => state.FaceDetectionService
  );
  const searchList = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllListByDate({ date: date }));
    setModalOpen(false);
  }, [dispatch, date, updating]);

  // set date
  //******* */
  const onChange = (d, dateString) => {
    setDate(dateString);
  };
  // handle search input
  //***************** */


  console.log(allListByDate);
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
    //collumn arrive status
    //************ */
    {
      title: "Arrive",
      dataIndex: "arrive",
      key: "arrive",
      render: (_, { check_in, check_out, id }) => (
        <div key={id}>
          {(() => {
            const timeIn = check_in.split(":");
            if (Number(timeIn[0]) * 60 * 60 + Number(timeIn[1]) * 60 > 30600) {
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
      ),
    },
    //collumn leave status
    //************ */
    {
      title: "Leave",
      dataIndex: "leave",
      key: "leave",
      render: (_, { check_in, check_out, id }) => (
        <div key={id}>
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
              dispatch(getTimeDetail({ id: id, date: date }));
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
      <div className="date-picker flex justify-between  my-10">
        <div className="search">
          {/* <AutoComplete
            popupMatchSelectWidth={252}
            style={{
              width: 300,
            }}
            options={options}
            onSearch={()=>{setTimeout(()=>{
              setOptions(allListByDate?.map((item) => {return {label: item.name}}))
            },500)}}            
          >
            <Input.Search size="large" placeholder="input here" enterButton />
          </AutoComplete> */}
          <Search/>
        </div>
        <div className="time-picker w-fit h-2/3">
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  /* here is your component tokens */
                  cellHoverBg: "white",
                },
              },
              token: {
                colorBgElevated: "rgb(42 43 47)",
                colorIcon: "rgb(108 114 147)",
                colorText: "rgb(108 114 147)",
              },
            }}
          >
            <DatePicker
              style={{
                backgroundColor: "rgb(42 43 47)",
                color: "rgb(108 114 147)",
                width: "150%",
                height: "150%",
              }}
              defaultValue={dayjs("2024-03-18")}
              onChange={onChange}
            />
          </ConfigProvider>
        </div>
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
          scroll={{
            x: 1300,
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
        <TimeDetail />
      </Modal>
    </div>
  );
};

export default Timekeeping;
