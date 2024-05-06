import { ConfigProvider, Modal, Table } from "antd";
import React, { useEffect } from "react";
import userImage from "../../../../assests/img/user-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotifiEvent,
  getAllNotifiEvent,
  getNotifiEventDetail,
} from "../../../../store/notification/thunkAction";
import moment from "moment";
import {
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
} from "@ant-design/icons";
import { modalActions } from "../../../../store/modals/slice";
import { notificationAction } from "../../../../store/notification/slice";

const NotificationList = () => {
  const { allNotifiEvent, updateNotification } = useSelector(
    (state) => state.NotificationService
  );
  const dispatch = useDispatch();
  const { confirm } = Modal;

  //get notification event
  useEffect(() => {
    dispatch(getAllNotifiEvent());
  }, [dispatch, updateNotification]);
  //open event detail modal
  const openEventDetail = (id) => {
    dispatch(getNotifiEventDetail(id));
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
      okButtonProps:{
        style: {backgroundColor: '#1677ff'}
      },
      onOk() {
        dispatch(deleteNotifiEvent(id));
        dispatch(notificationAction.clearNofifiEventDetai());
      },
      onCancel() {
        dispatch(notificationAction.clearNofifiEventDetai());
      },
    });
  };
  //collumns for table
  const collumns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Notification name",
    },
    {
      key: "camera",
      dataIndex: "camera",
      title: "Camera",
    },
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
    {
      key: "image",
      dataIndex: "image",
      title: "Image",
      render: () => (
        <div className="size-28">
          <img src={userImage} alt="notification-img" />
        </div>
      ),
    },
    {
      key: "action",
      dataIndex: "action, id",
      title: "action",
      width: 150,
      fixed: "right",
      render: (_, { id }) => (
        <div key={id}>
          <button
            onClick={() => {
              openEventDetail(id);
            }}
            className="edit text-lg text-blue-600"
          >
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
          columns={collumns}
          dataSource={allNotifiEvent}
        />
      </ConfigProvider>
    </div>
  );
};

export default NotificationList;
