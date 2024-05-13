import {
  // TeamOutlined,
  // VideoCameraOutlined,
  // BarChartOutlined,
  // CalculatorOutlined,
  // PlusOutlined,
  AlertOutlined,
  MehOutlined,
} from "@ant-design/icons";
import { Affix, ConfigProvider, Menu } from "antd";
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
    <Affix offsetTop={0}>
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
                icon: <MehOutlined />,
                label: <div className="md:text-xl ">Face Detection</div>,
                className: " my-3 menu-item",
                children: [
                  {
                    key: "10",
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
                    key: "11",
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
                    key: "12",
                    label: (
                      <div className="md:text-xl">
                        <NavLink to={"/faceDetection/chart"}>Chart</NavLink>
                      </div>
                    ),
                    className: "sub-menu-item",
                  },
                  {
                    key: "13",
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
                    key: "14",
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
                    key: "15",
                    label: <div className="md:text-xl">Notification</div>,
                    children: [
                      {
                        key: "101",
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
                        key: "102",
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
                key: "2",
                icon: <AlertOutlined />,
                label: <div className="md:text-xl">Pose Detection</div>,
                className: "menu-item",
                children: [
                  {
                    key: "21",
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
                    key: "22",
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
