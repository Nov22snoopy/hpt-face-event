import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFaceDetection } from "../../../store/faceDetection/thunkAction";
import "./authorizationList.css";
import moment from "moment";
import Loading from "../../../component/Loading";
import { ConfigProvider, Pagination } from "antd";
import userImage from "../../../assests/img/user-img.jpg";
import SkeletonImage from "antd/es/skeleton/Image";
import FormSearchInList from "../../FormSearch/FormSearchInList";
const AuthoriaztionList = () => {
  const [page1, setPage1] = useState(0);
  const [email, setEmail] = useState('');
  const [listId, setListId] = useState([])
  const [page2, setPage2] = useState(12);
  const { faceDetection, loading } = useSelector(
    (state) => state.FaceDetectionService
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFaceDetection({email:email, listId: listId}));
  }, [dispatch, email, listId]);
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
                <div>
                  {" "}
                  <span className="font-extrabold">Name: </span> {user.name}
                </div>
                <div>
                  <span className="font-extrabold">Email: </span>
                  {user.comment}
                </div>
                <div>
                  <span className="font-extrabold">Date: </span>{" "}
                  {dataFormat(user.created_at)}
                </div>
                <div>
                  <span className="font-extrabold">Camera: </span> {user.camera}
                </div>
                <div><span className="font-extrabold">Match: </span>{user.confidence}%</div>
              </div>
              <div className="col-4 p-0">
                <div>
                  <span className="font-extrabold">List: </span> {user.list_face}
                </div>
                <div>
                  <span className="font-extrabold">Mask: </span> null
                </div>
                <div>
                  <span className="font-extrabold">Age: </span> {user.age}
                </div>
                <div>
                  <span className="font-bold">Gender: </span>{" "}
                  {genderDetect(user.gender)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="">
      <div className="form-search">
        <FormSearchInList setEmail={setEmail} setListId={setListId}/>
      </div>
      {loading ? (
        <div className="container mx-auto">
          <div className="row">{faceDetectionRender(page1, page2)}</div>
          <div className="my-3 flex justify-end">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {},
                },
              }}
            >
              <Pagination
                className=""
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
