import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sideMenuAction } from "../../store/SideMenu/slice";
import "./../../assests/styles/mainHeader/mainHeader.css";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/user/thunkAction";

const MainHeader = () => {
  const { collapse } = useSelector((state) => state.SideMenu);
  const { user } = useSelector((state) => state.UserService);
  const dispatch = useDispatch();
  return (
    <header className="main-header d-flex flex-row justify-content-between w-full justify-center ">
      <div className="search d-flex justify-content-center px-0">
        {collapse ? (
          <button
            className="sideBtn btn mb-3"
            onClick={() => {
              dispatch(sideMenuAction.closeSideMenu());
            }}
          >
            <MenuFoldOutlined />
          </button>
        ) : (
          <button
            className="sideBtn btn mb-3"
            onClick={() => {
              dispatch(sideMenuAction.openSideMenu());
            }}
          >
            <MenuUnfoldOutlined />
          </button>
        )}
      </div>
      <div className="header-user md:px-3 px-1">
        <div className="flex justify-center items-center">
          {" "}
          <span className="user-icon mr-1">
            <UserOutlined style={{ fontSize: "24px" }} />
          </span>
          <span>
            <h3 className="md:text-xl sm:text-lg user-name">{user?.email}  <span className="text-sm"><DownOutlined /></span></h3>
          </span>
        </div>

        <div className="sub-menu md:text-lg text-md px-2">
          <div className="drop-down-menu">
            <div className="sub-body py-2">
              <NavLink to={"/profile"} className={"flex items-center md:py-2"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user pr-1"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
                View my profile
              </NavLink>
              <a
                onClick={() => {
                  dispatch(logout({ email: user?.email }));
                }}
                className="flex items-center md:py-2"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-out pr-1"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                  </svg>
                </div>
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
