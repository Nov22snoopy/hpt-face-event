import { Table, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  getAllNotification,
  getNotificationDetail,
} from "../../../../store/notification/thunkAction";
import { modalActions } from "../../../../store/modals/slice";
import DayOfWeek from "../../../../component/DayOfWeek/DayOfWeek";

const NotificationManagement = () => {
  const { notification, updateNotification } = useSelector(
    (state) => state.NotificationService
  );
  const dispatch = useDispatch();
  console.log(notification);
  useEffect(() => {
    dispatch(getAllNotification());
  }, [dispatch, updateNotification]);

  const openNotificationForm = (id) => {
    dispatch(getNotificationDetail(id));
    dispatch(modalActions.openForm());
  };

  const collumns = [
    {
      key: "name",
      dataIndex: "name, id",
      title: "Notification name",
      render: (_, { name, id }) => <div key={id}>{name}</div>,
    },
    {
      key: "time",
      dataIndex: "time",
      title: "Time",
      render: (_, { time, id }) => (
        <div key={id}>
          {time?.map((item, index) => {
            return (
              <div key={index}>
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      key: "created_at",
      dataIndex: "created_at, id",
      title: "Created at",
      render: (_, { created_at, id }) => (
        <div key={id}>{moment(created_at).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      key: "camera",
      dataIndex: "camera, id",
      title: "Camera",
      render: (_, { camera, id }) => (
        <div key={id}>
          {camera?.map((item, index) => {
            return (
              <Tag className="mx-1" key={index}>
                {item}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      key: "actiop",
      dataIndex: "action, id",
      title: "action",
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
          <button className="delete text-lg ml-3 text-red-600">
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
    {
      key: "DayOfWeek",
      dataIndex: "dayOfWeek",
      title: "Day of week",
      render: (_, { day_of_week, id }) => (
        <div key={id}>
          {day_of_week?.map((item, index) => {
            return (
              <p key={index}>
                {item.split(",").map((date) => {
                  return (
                    <Tag>
                      <DayOfWeek date={date} />
                    </Tag>
                  );
                })}
              </p>
            );
          })}
        </div>
      ),
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: (_, { status, id }) => (
        <div key={id}>
          {(() => {
            if (status.data[0] === 0) {
              return <Tag color="red">Off</Tag>;
            } else if (status.data[0] === 1) {
              return <Tag color="green">On</Tag>;
            }
          })()}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        dataSource={notification}
        columns={collumns}
      />
    </div>
  );
};

export default NotificationManagement;
