import {
  // TeamOutlined,
  // VideoCameraOutlined,
  // BarChartOutlined,
  // CalculatorOutlined,
  // PlusOutlined,
  AlertOutlined,
  LineChartOutlined,
  MehOutlined,
} from "@ant-design/icons";
import { Affix, ConfigProvider, Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate } from "react-router-dom";

import "./sideMenu.css";
const SideMenu = () => {
  const [header, setHeader] = useState(Boolean);

  const { user } = useSelector((state) => state.UserService);

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
    <Affix offsetTop={0}>
      <div className="">
        {window.addEventListener("resize", setWindow)}
        {header || windowDefault() ? (
          <NavLink to={"/"}>
            <div className="side-menu-header"></div>
          </NavLink>
        ) : (
          ""
        )}
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                /* here is your component tokens */
                itemSelectedColor: "#A0153E",
              },
            },
          }}
        >
          <Menu
            style={{
              flex: 1,
              minWidth: 10,
              margin: "auto",
            }}
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <LineChartOutlined />,
                label: (
                  <div className="md:text-xl ">
                    <NavLink to={"/"}>Dashbroad</NavLink>
                  </div>
                ),
                className: " my-3 menu-item",
              },
              {
                key: "2",
                icon: <MehOutlined />,
                label: <div className="md:text-xl ">Face Detection</div>,
                className: " my-3 menu-item",
                children: [
                  {
                    key: "21",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/faceDetection/authorizationList"}>
                          In List
                        </NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "22",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/faceDetection/offList"}>
                          Out List
                        </NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "23",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/faceDetection/chart"}>Chart</NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "24",
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
                    key: "25",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/faceDetection/addList"}>
                          Test Trigger
                        </NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "26",
                    label: <div className="md:text-xl">Notification</div>,
                    children: [
                      {
                        key: "201",
                        className: "sub-menu-item",
                        label: (
                          <div className="md:text-lg">
                            <NavLink to={"/faceDetection/notification/list"}>
                              Trigger List
                            </NavLink>
                          </div>
                        ),
                      },
                      {
                        key: "202",
                        className: "sub-menu-item",
                        label: (
                          <div className="md:text-lg">
                            <NavLink
                              to={"/faceDetection/notification/management"}
                            >
                              Trigger Management
                            </NavLink>
                          </div>
                        ),
                      },
                    ],
                  },
                ],
              },
              {
                key: "3",
                icon: <AlertOutlined />,
                label: <div className="md:text-xl">Pose Detection</div>,
                className: "menu-item",
                children: [
                  {
                    key: "31",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/poseDetection/poseAlertList"}>
                          Trigger List
                        </NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "32",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/poseDetection/poseAlertManagement"}>
                          Trigger Management
                        </NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                ],
              },
            ]}
          ></Menu>
        </ConfigProvider>
      </div>
    </Affix>
  );
};

export default SideMenu;
