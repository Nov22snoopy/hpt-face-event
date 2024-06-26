import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Flex } from "antd";
import React, { useEffect, useState } from "react";
import userImage from "../../../../assests/img/user-img.jpg";
import fallingImage from "../../../../assests/img/man_falling_down.jpg";
import sittingImage from "../../../../assests/img/man_sitting.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { modalActions } from "../../../../store/modals/slice";

const WarningModal = (props) => {
  const [eventDetail, setEventDetail] = useState(null)
  const dispatch = useDispatch();
  const { notifiEventDetail } = useSelector(
    (state) => state.NotificationService
  );
  const { poseDetectionEventDetail } = useSelector(
    (state) => state.PoseDetectionService
  );
  const { notifi, object } = props;
  console.log(poseDetectionEventDetail);
  //set event detail data display
  
  useEffect(()=>{
    if(notifiEventDetail) {
      setEventDetail(notifiEventDetail[0])
    }
    else if(poseDetectionEventDetail) {
      setEventDetail(poseDetectionEventDetail[0])
    }
  },[notifiEventDetail,poseDetectionEventDetail])
  //set warningImage
  const warningImage = () => {
    if (notifi?.notifiName === "falling_down" || eventDetail?.poseType === "falling_down" ) {
      return fallingImage;
    }
    if (notifi?.notifiName === "sitting" || eventDetail?.poseType === "sitting") {
      return sittingImage;
    } else {
      return userImage;
    }
  };
  return (
    <>
      <div className="text-center">
        <h1 className="text-xl font-bold text-red-600">
          <span className="mr-2">
            <ExclamationCircleFilled />
          </span>
          WARNING !!!
        </h1>
      </div>
      <hr className="my-3" />
      <Flex className="justify-between">
        <div className="detail-content w-1/2">
          {/* notification name */}
          <div className="notification-name mt-2">
            <h1 className="text-lg font-semibold">Notification name</h1>
            <p>
              {eventDetail
                ? eventDetail.name || eventDetail.poseType
                : notifi?.notifiName}
            </p>
          </div>
          {/* notification object */}
          {object || notifiEventDetail ? (
            <div className="object-detail mt-3">
              <h1 className="text-lg font-semibold">Object</h1>
              <div className="flex justify-start gap-2">
                <p className="text-md">
                  <span className="font">Age: </span>
                  {notifiEventDetail ? notifiEventDetail[0].age : object?.age}
                </p>
                <p className="text-md">
                  <span className="font">Gender: </span>
                  {notifiEventDetail
                    ? notifiEventDetail[0].gender === 1
                      ? "Male"
                      : "Female"
                    : object?.gender === 1
                    ? "Male"
                    : "Female"}
                </p>
              </div>
            </div>
          ) : null}

          {/* notification time */}
          <div className="notification-time mt-3">
            <h1 className="text-lg font-semibold">Time</h1>
            <p>
              {eventDetail
                ? moment(eventDetail.created_at).format(
                    "DD-MM-YYYY HH:mm:ss"
                  )
                : notifi?.notifiTime}
            </p>
          </div>
          {/* notification camera */}
          <div className="notification-camera mt-3">
            <h1 className="text-lg font-semibold">Camera/Position</h1>
            <p>
              Camera:{" "}
              {eventDetail
                ? eventDetail.camera
                : object?.stream_id}{" "}
            </p>
          </div>
        </div>
        <div className="detail-image w-1/2">
          <div className="object-img">
            <img src={warningImage()} alt="notifiImg" />
          </div>
        </div>
      </Flex>
      <div className="close=modal text-center mt-2">
        <Button
          danger
          type=""
          onClick={() => {
            dispatch(modalActions.closeWanringFaceModal());
          }}
          className="w-3/4 text-lg"
        >
          Close
        </Button>
      </div>
    </>
  );
};

export default WarningModal;
