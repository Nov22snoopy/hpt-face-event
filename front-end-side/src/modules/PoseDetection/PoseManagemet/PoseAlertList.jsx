import React, { useEffect, useState } from "react";
import FormSearchAlertList from "../../FormSearch/FormSearchAlertList";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, ExclamationCircleFilled, EyeOutlined } from "@ant-design/icons";
import fallingImage from "../../../assests/img/man_falling_down.jpg";
import sittingImage from "../../../assests/img/man_sitting.jpg";
import { deletePoseDetectionEvent, getAllPoseDetectionEvent, getPoseDetectionEventDetail } from "../../../store/poseDetection/thunkAction";
import { ConfigProvider, Modal, Table } from "antd";
import { modalActions } from "../../../store/modals/slice";
const PoseAlertList = () => {
  const [poseType, setPoseType] = useState("");
  const [streamId, setStreamId] = useState([]);
  const [timeId, setTimeId] = useState([]);
  const {poseDetectionEvent, updatePoseDetection} = useSelector((state)=>state.PoseDetectionService)
  const dispatch = useDispatch();
  const { confirm } = Modal;

  //get all pose alert event
  useEffect(() => {
    dispatch(
      getAllPoseDetectionEvent({
        poseType: poseType,
        streamId: streamId,
        timeId: timeId,
      })
    );
  },[dispatch, poseType, streamId, timeId, updatePoseDetection]);
  console.log(poseDetectionEvent);
  //open event detail modal
  const openEventDetail = (id) => {
    dispatch(getPoseDetectionEventDetail(id))
    dispatch(modalActions.openWanringFaceModal(true));
  };
    //confirmDelete event
    const deleteConfirm = (id) => {
      confirm({
        title: "Warning!!!",
        centered: true,
        width: 500,
        icon: <ExclamationCircleFilled />,
        content: `Do you want to delete this notification`,
        okButtonProps: {
          style: { backgroundColor: "#1677ff" },
        },
        onOk() {
          dispatch(deletePoseDetectionEvent(id));
        },
        onCancel() {
        },
      });
    };
  const collumns = [
    //pose type
    {
      key: "poseType",
      dataIndex: "poseType",
      title: "Notification name",
    },
    //camera
    {
      key: "camera",
      dataIndex: "camera",
      title: "Camera",
    },
    //create at
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Appear time",
      render: (created_at) => (
        <div className="">
          {moment(created_at).format("DD-MM-YYYY HH:mm:ss")}
        </div>
      ),
    },
    //image
    {
      key: "image",
      dataIndex: "poseType",
      title: "Image",
      render: (poseType) => (
        <div className="size-28">
          <img src={poseType === 'falling_down'? fallingImage:sittingImage} alt="notification-img" />
        </div>
      ),
    },
    //action
    {
      key: "action",
      dataIndex: "action, id",
      title: "action",
      width: 150,
      fixed: "right",
      render: (_, { id }) => (
        <div key={id}>
          <button className="edit text-lg text-blue-600" onClick={()=>{openEventDetail(id)}}>
            <EyeOutlined />
          </button>
          <button
            onClick={() => {
              deleteConfirm(id);
            }}
            className="delete text-lg ml-3 text-red-600"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="form-search">
        <FormSearchAlertList setName={setPoseType} setStreamId={setStreamId} setTimeId={setTimeId} />
      </div>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {},
            Table: {},
          },
          token: {
            colorText: "rgb(108 114 147)",
            fontWeightStrong: "18px",
          },
        }}
      >
        <Table
          rowKey={(record) => record.id}
          dataSource={poseDetectionEvent}
          columns={collumns}
          scroll={{
            x: 1300,
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default PoseAlertList;
