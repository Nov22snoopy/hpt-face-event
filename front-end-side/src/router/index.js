import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Profile from "../pages/Profile/Profile";
import FaceDetection from "../pages/faceDetection/FaceDetection";
import HomePage from "../pages/homePage/HomePage";
import AuthoriaztionList from "../modules/FaceDetection/AuthorizationList/AuthoriaztionList";
import OffList from "../modules/FaceDetection/OffList/OffList";
import IndexPage from "../modules/indexPage/IndexPage";
import Chart from "../modules/FaceDetection/Chart/Chart";
import Timekeeping from "../modules/FaceDetection/Timekeeping/Timekeeping";
import AddList from "../modules/FaceDetection/AddList/AddList";
import NotificationList from "../modules/FaceDetection/Noctification/NocManagament/NotificationList";
import Notification from "../modules/FaceDetection/Noctification/Notification";
import NotificationManagement from "../modules/FaceDetection/Noctification/NocManagament/NotificationManagement";
import PoseDetection from "../modules/PoseDetection/PoseDetection";
import PoseAlertList from "../modules/PoseDetection/PoseManagemet/PoseAlertList";
import PoseAlertManagement from "../modules/PoseDetection/PoseManagemet/PoseAlertManagement";
const Router = () => {
  const element = useRoutes([
    {
      path: "/login",
      element: <HomePage />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { 
          index: true,
          path: '',
          element: <IndexPage/>,
        },
        {
          path: "/faceDetection",
          element: <FaceDetection />,
          children: [
            {
              path: "/faceDetection/authorizationList",
              element: <AuthoriaztionList />,
            },
            {
              path: "/faceDetection/offList",
              element: <OffList />,
            },
            {
              path: "/faceDetection/chart",
              element :<Chart/>
            },
            {
              path: '/faceDetection/timekeeping',
              element: <Timekeeping/>
            },
            {
              path: "/faceDetection/addList",
              element: <AddList/>
            },
            {
              path: '/faceDetection/notification',
              element: <Notification/>,
              children: [
                {
                  path: '/faceDetection/notification/list',
                  element: <NotificationList/>
                },
                {
                  path: '/faceDetection/notification/management',
                  element: <NotificationManagement/>
                }
              ]
            }
          ],
        },
        {
          path:"/poseDetection",
          element: <PoseDetection/>,
          children: [
            {
              path: "/poseDetection/poseAlertList",
              element: <PoseAlertList/>
            },
            {
              path: "/poseDetection/poseAlertManagement",
              element: <PoseAlertManagement/>
            },
          ]
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return element;
};

export default Router;
