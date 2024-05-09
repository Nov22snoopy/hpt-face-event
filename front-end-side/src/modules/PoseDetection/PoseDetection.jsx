import React from "react";
import { Outlet } from "react-router-dom";
import "./poseDetection.css";
import { Modal } from "antd";
import PoseAlertForm from "./PoseManagemet/PoseAlertForm";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modals/slice";
import { poseDetectionActions } from "../../store/poseDetection/slice";
const PoseDetection = () => {
  const { poseAlertModal } = useSelector((state) => state.ModalService);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        centered
        footer={null}
        open={poseAlertModal}
        style={{
          minWidth: "850px",
        }}
        onCancel={() => {
          dispatch(poseDetectionActions.clearPoseDetectionDetail())
          dispatch(modalActions.closePoseAlertModal());
        }}
      >
        <PoseAlertForm />
      </Modal>
      <div className="mt-[-24px]  pt-5 mb-2 ">
        <div className=" text-white md:mb-0 mb-3 flex justify-start items-start">
          <div className="pose-detection-header md:text-xl text-lg ">
            <h1>Pose Detection</h1>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default PoseDetection;
