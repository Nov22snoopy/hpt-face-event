import {
  RadarChartOutlined,
  TeamOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  CalculatorOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "./sideMenu.css";
const SideMenu = () => {
  const [header, setHeader] = useState(Boolean);

  const { user } = useSelector((state) => state.UserService);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  // set window size for responsive
  //*********************** */
  const setWindow = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth >= 576) {
      setHeader(true);
    } else if (windowWidth < 576) {
      setHeader(false);
    }
  };
  // set window size for default
  //********************* */
  const windowDefault = () => {
    let windowWidth = window.innerWidth;
    let defaultValue = true;
    if (windowWidth >= 576) {
      defaultValue = true;
    } else if (windowWidth < 576) {
      defaultValue = false;
    }
    return defaultValue;
  };
  return (
    <div className="">
      {window.addEventListener("resize", setWindow)}
      {header || windowDefault() ? (
        <div
          onClick={() => {
            navigate("/");
          }}
          className="side-menu-header"
        ></div>
      ) : (
        ""
      )}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              /* here is your component tokens */
              darkItemSelectedBg: "rgb(157 33 59)",
            },
          },
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <RadarChartOutlined />,
              label: (
                <div className="md:text-xl">
                  Face Detection
                </div>
              ),
              className: " my-3",
              children: [
                {
                  key: "10",
                  icon: <TeamOutlined />,
                  label: (
                    <div className="md:text-xl">
                      <NavLink to={"/faceDetection/authorizationList"}>
                        all List
                      </NavLink>
                    </div>
                  ),
                  className: "sub-menu-item",
                },
                {
                  key: "11",
                  icon: <VideoCameraOutlined />,
                  label: (
                    <div className="md:text-xl">
                      <NavLink to={"/faceDetection/offList"}>Off List</NavLink>
                    </div>
                  ),
                  className: "sub-menu-item",
                },
                {
                  key: "12",
                  icon: <BarChartOutlined />,
                  label: (
                    <div className="md:text-xl">
                      <NavLink to={"/faceDetection/chart"}>Chart</NavLink>
                    </div>
                  ),
                  className: "sub-menu-item",
                },
                {
                  key: "13",
                  icon: <CalculatorOutlined />,
                  label: (
                    <div className="md:text-xl">
                      <NavLink to={"/faceDetection/timekeeping"}>
                        Timekeeping
                      </NavLink>
                    </div>
                  ),
                  className: "sub-menu-item",
                },
                {
                  key: '14',
                  icon: <PlusOutlined />,
                  label: (
                    <div className="md:text-xl">
                      <NavLink to={"/faceDetection/addList"}>
                        Create new list
                      </NavLink>
                    </div>
                  )
                }
              ],
            },
          ]}
          style={{
            flex: 1,
            minWidth: 10,
            margin: "auto",
            backgroundColor: " rgb(42 43 47)",
          }}
        ></Menu>
      </ConfigProvider>
    </div>
  );
};

export default SideMenu;
