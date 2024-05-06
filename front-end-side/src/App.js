import { createBrowserHistory } from "history";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { connectSocket } from "./store/socket/thunkAction";
import { Modal } from "antd";
import WarningModal from "./modules/FaceDetection/Noctification/NocManagament/WarningModal";
import { io } from "socket.io-client";
import { createEvent } from "./store/notification/thunkAction";
import { modalActions } from "./store/modals/slice";
import { notificationAction } from "./store/notification/slice";
const socket = io("http://localhost:8080");
function App() {
  const [object, setObject] = useState(null);
  const [notifi, setNotifi] = useState(null);
  const {warningFaceModal} = useSelector(state => state.ModalService)
  const dispatch = useDispatch();
  //connect socket
  useEffect(() => {
    dispatch(connectSocket());
  }, [dispatch]);
  //close modal
  const onCancel = () => {
    dispatch(modalActions.closeWanringFaceModal())
    dispatch(notificationAction.clearNofifiEventDetai())
    setNotifi(null)
    setObject(null)
  };
  //get socket warning
  useEffect(() => {
    socket.on("warning", (value) => {
      dispatch(modalActions.openWanringFaceModal(value.check))
      setObject(value.object);
      setNotifi(value.notification);
    });
  },[dispatch]);
  //save new event to database
  useEffect(() => {
    if (notifi && object) {
      const data = {
        notifiId: notifi.notifiId,
        streamId: object.stream_id,
        age: object.age,
        gender: Number(object.gender),
        createdAt: notifi.notifiTime,
      };
      dispatch(createEvent(data));
    }
  }, [notifi, object, dispatch]);
  //history
  const history = createBrowserHistory();

  return (
    <>
      {/* modal warning */}
      <Modal centered width={600} open={warningFaceModal} footer= {null} onCancel={onCancel}>
        <WarningModal
          notifi={notifi}
          object={object}

        />
      </Modal>
      {/* router */}
      <BrowserRouter>
        <Router history={history}></Router>
      </BrowserRouter>
    </>
  );
}

export default App;
