import { Table, Tag, Modal, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  deleteNotification,
  getAllNotification,
  getNotificationDetail,
} from "../../../../store/notification/thunkAction";
import { modalActions } from "../../../../store/modals/slice";
import DayOfWeek from "../../../../component/DayOfWeek/DayOfWeek";
import { notificationAction } from "../../../../store/notification/slice";
import SwitchCheck from "../../../../component/Switch/SwitchCheck";
import FormSearchAlertManagement from "../../../FormSearch/FormSearchAlertManagement";

const NotificationManagement = () => {
  const { notification, updateNotification } = useSelector(
    (state) => state.NotificationService
  );
  const [name, setName] = useState('')
  const [streamId, setStreamId] = useState([])
  const [timeId, setTimeId] = useState('')
  const dispatch = useDispatch();
  const { confirm } = Modal;
  //display all notifcation
  useEffect(() => {
    dispatch(getAllNotification({name:name, streamId: streamId, timeId: timeId}));
  }, [dispatch, updateNotification, name, streamId, timeId]);

  //open update notification form
  const openNotificationForm = (id) => {
    dispatch(getNotificationDetail(id));
    dispatch(modalActions.openForm());
  };
  // confirm modal
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
        dispatch(deleteNotification(id));
        dispatch(notificationAction.clearNotifiDetail());
      },
      onCancel() {
        dispatch(notificationAction.clearNotifiDetail());
      },
    });
  };
  const collumns = [
    //notification name
    {
      key: "name",
      dataIndex: "name, id",
      title: "Notification name",
      fixed: "left",
      render: (_, { name, id }) => <div key={id}>{name}</div>,
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
          <SwitchCheck status={status.data.toString("hex")} id={id} />
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
            onClick={() => {
              openNotificationForm(id);
            }}
            className="edit text-lg text-blue-600"
          >
            <EditOutlined />
          </button>
          <button
            className="delete text-lg ml-3 text-red-600"
            onClick={() => {
              deleteConfirm(id);
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="form_search">
        <FormSearchAlertManagement
        setName = {setName}
        setStreamId = {setStreamId}
        setTimeId = {setTimeId}
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
          dataSource={notification}
          columns={collumns}
          scroll={{
            x: 1300,
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default NotificationManagement;
