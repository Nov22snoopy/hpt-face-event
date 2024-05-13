import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePoseDetectionSetting,
  getPoseDetectionDetail,
  getPoseDetectionSetting,
  updatePoseDetectionStatus,
} from "../../../store/poseDetection/thunkAction";
import { ConfigProvider, Modal, Table, Tag } from "antd";
import DayOfWeek from "../../../component/DayOfWeek/DayOfWeek";
import moment from "moment";
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import SwitchCheck from "../../../component/Switch/SwitchCheck";
import FormSearchAlertManagement from "../../FormSearch/FormSearchAlertManagement";
import { modalActions } from "../../../store/modals/slice";

const PoseAlertManagement = () => {
  const [poseType, setPoseType] = useState("");
  const [streamId, setStreamId] = useState([]);
  const [timeId, setTimeId] = useState("");
  const { poseDetectionSetting, updatePoseDetection } = useSelector(
    (state) => state.PoseDetectionService
  );
  const { confirm } = Modal;

  const dispatch = useDispatch();
  //get all pose detection alert setting
  useEffect(() => {
    dispatch(
      getPoseDetectionSetting({
        poseType: poseType,
        streamId: streamId,
        timeId: timeId,
      })
    );
  }, [dispatch, poseType, streamId, timeId, updatePoseDetection]);
  //open pose modal form
  const openModal = () => {
    dispatch(modalActions.openPoseAlertModal());
  };
  //delete confirm modal
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
        dispatch(deletePoseDetectionSetting(id));
      },
      onCancel() {
      },
    });
  };
  //collums table
  const collumns = [
    //notification name
    {
      key: "name",
      dataIndex: "name, id",
      title: "Notification name",
      fixed: "left",
      render: (_, { poseType, id }) => <div key={id}>{poseType.toUpperCase()}</div>,
    },
    //camera
    {
      key: "camera",
      dataIndex: "camera, id",
      title: "Camera",
      render: (_, { camera, id }) => (
        <div key={id}>
          {camera.map((item, index) => {
            return (
              <Tag className="mx-1" key={index}>
                Camera {item}
              </Tag>
            );
          })}
        </div>
      ),
    },
    //time
    {
      key: "time",
      dataIndex: "time",
      title: "Time",
      render: (_, { time, id }) => (
        <div key={id}>
          {time?.map((item, index) => {
            return (
              <div key={index}>
                <span>{item.start_time}</span> - <span>{item.end_time}</span>
              </div>
            );
          })}
        </div>
      ),
    },

    // //day of week
    {
      key: "DayOfWeek",
      dataIndex: "dayOfWeek",
      title: "Day of week",
      render: (_, { date, id }) => (
        <div key={id}>
          {date?.map((item, index) => {
            return (
              <div key={index}>
                {item.split(",").map((date, i) => {
                  return (
                    <Tag key={i}>
                      <DayOfWeek date={date} />
                    </Tag>
                  );
                })}
              </div>
            );
          })}
        </div>
      ),
    },
    //created_at
    {
      key: "created_at",
      dataIndex: "created_at, id",
      title: "Created at",
      render: (_, { created_at, id }) => (
        <div key={id}>{moment(created_at).format("DD-MM-YYYY")}</div>
      ),
    },
    //status
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      width: 150,
      fixed: "right",
      render: (_, { status, id }) => (
        <div key={id}>
          <SwitchCheck
            status={status.data.toString("hex")}
            id={id}
            action={updatePoseDetectionStatus}
          />
        </div>
      ),
    },
    //action
    {
      key: "action",
      dataIndex: "action, id",
      title: "action",
      width: 100,
      fixed: "right",
      render: (_, { id }) => (
        <div key={id}>
          <button
            className="edit text-lg text-blue-600"
            onClick={() => {
              dispatch(getPoseDetectionDetail(id));
              openModal();
            }}
          >
            <EditOutlined />
          </button>
          <button className="delete text-lg ml-3 text-red-600">
            <DeleteOutlined onClick={()=>{deleteConfirm(id)}} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="form-search">
        <FormSearchAlertManagement
          setName={setPoseType}
          setStreamId={setStreamId}
          setTimeId={setTimeId}
          openModal={openModal}
        />
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
          dataSource={poseDetectionSetting}
          columns={collumns}
          scroll={{
            x: 1300,
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default PoseAlertManagement;
