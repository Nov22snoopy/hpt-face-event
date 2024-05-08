import { Modal } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateNotification from "./NocManagament/CreateNotification";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/modals/slice";
import { notificationAction } from "../../../store/notification/slice";
import "./notification.css"
const Notification = () => {
  const {notificationForm} = useSelector(state => state.ModalService)
  const dispatch = useDispatch()
 
  return (
    <div className="container">
      <div className="mt-1">
        <Outlet />
      </div>
      <div className="">
        <Modal
          centered
          footer={null}
          open={notificationForm}
          onCancel={() => {
            dispatch(modalActions.closeForm());
            dispatch(notificationAction.clearNotifiDetail())
          }}
          style={{
            minWidth: '850px'
          }}
        >
          <CreateNotification/>
        </Modal>
      </div>
    </div>
  );
};

export default Notification;
