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
            }
          ],
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
