import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFaceDetection } from "../../../store/faceDetection/thunkAction";
import "./authorizationList.css";
import moment from "moment";
import Loading from "../../../component/Loading";
import { ConfigProvider, Pagination } from "antd";
import userImage from "../../../assests/img/user-img.jpg";
import SkeletonImage from "antd/es/skeleton/Image";
import { socketClient } from "../../..";
const AuthoriaztionList = () => {
  const [page1, setPage1] = useState(0);
  const [page2, setPage2] = useState(12);
  const { faceDetection, loading } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFaceDetection());
  }, [dispatch]);
  // function set gender
  //********************* */
  const genderDetect = (gender) => {
    if (gender === 1) {
      return "Male";
    } else if (gender === 0) {
      return "Female";
    }
  };
  // function set date format
  //********************* */
  const dataFormat = (e) => {
    return moment(e).format("DD/MM/YYYY HH:mm:ss");
  };

  // function render list face detection
  //********************* */
  const faceDetectionRender = (num1, num2) => {
    return faceDetection?.slice(num1, num2).map((user, index) => {
      return (
        <div
          key={index + 1}
          className="card col-12 col-xl-4 col-lg-6 md:m-[20px] m-[10px]"
        >
          <div className="card-header container-fluid">
            <div className="row">
              <div className="face-img col-lg-6 col-12 ">
                {user.face_image ? (
                  <img src={userImage} alt="img" loading="lazy" />
                ) : (
                  <SkeletonImage
                    style={{
                      height: "150px",
                      width: "150px",
                      color: "#bfbfbf",
                    }}
                    active={true}
                  />
                )}
              </div>
              <div className="frame-img col-lg-6 col-12">
                {user.frame_image ? (
                  <img src={userImage} alt="img" loading="lazy" />
                ) : (
                  <SkeletonImage
                    style={{
                      height: "150px",
                      width: "150px",
                      color: "#bfbfbf",
                    }}
                    active={true}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="card-body container-fluid">
            <div className="row text-md">
              <div className="col-8">
                {" "}
                <div>Name: {user.name}</div>
                <div>Email: {user.comment}</div>
                <div>Date: {dataFormat(user.created_at)}</div>
                <div>Camera: {user.camera}</div>
                <div>Match Percentage: {user.confidence}%</div>
              </div>
              <div className="col-4">
                <div>List: {user.list_face}</div>
                <div>Mask: null</div>
                <div>Age: {user.age}</div>
                <div>Gender: {genderDetect(user.gender)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="">
      <div className="face-detec-header"></div>
      {loading ? (
        <div className="container mx-auto">
          <div className="row">{faceDetectionRender(page1, page2)}</div>
          <div className="my-5 ">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    itemActiveBg: "grey",
                    itemInputBg: "grey",
                    colorText: "white",
                  },
                },
              }}
            >
              <Pagination
                className="mx-auto md:w-1/4 w-1/2 text-white "
                size="default "
                total={faceDetection?.length}
                pageSize={10}
                onChange={(page) => {
                  setPage1((page - 1) * 10 + (page - 1) * 2);
                  setPage2(page * 10 + page * 2);
                }}
                showQuickJumper
              />
            </ConfigProvider>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthoriaztionList;
