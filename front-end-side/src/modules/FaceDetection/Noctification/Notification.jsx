import { PlusCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import CreateNotification from "./NocManagament/CreateNotification";
import { useDispatch, useSelector } from "react-redux";
import { faceDetectionActions } from "../../../store/faceDetection/slice";
import { modalActions } from "../../../store/modals/slice";

const Notification = () => {
  const {notificationForm} = useSelector(state => state.ModalService)
  const dispatch = useDispatch()
 
  return (
    <div className="container">
      <div>
        <button
          onClick={() => {
            dispatch(modalActions.openForm());
          }}
          className="w-fit rounded-full overflow-hidden"
        >
          <PlusCircleOutlined
            twoToneColor="#eb2f96"
            style={{
              fontSize: "50px",
              color: "white",
              backgroundColor: "green",
              overflow: "hidden",
            }}
          />
        </button>{" "}
      </div>
      <div className="mt-4">
        <Outlet />
      </div>
      <div className="">
        <Modal
          centered
          footer={null}
          open={notificationForm}
          onCancel={() => {
            dispatch(modalActions.closeForm());
          }}
          style={{
            minWidth: '1000px'
          }}
        >
          <CreateNotification/>
        </Modal>
      </div>
    </div>
  );
};

export default Notification;
