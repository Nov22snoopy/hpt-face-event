import Sider from "antd/es/layout/Sider";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../modules/mainPages/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import SideMenu from "../modules/SideMenu/SideMenu";
import { Affix, Drawer } from "antd";
import { sideMenuAction } from "../store/SideMenu/slice";
import "./mainLayout.css";
import MainFooter from "../modules/mainPages/MainFooter";

// set set style for layout
//********************* */
const layoutStyle = {
  overflow: "hidden",
  padding: '5px',
  minHeight: '100svh'
};
// set set style for siter
//********************* */
const siderStyle = {
  overflow: 'auto',
  lineHeight: "100px",
  backgroundColor: "white",
  height: "auto",
  minHeight: '100svh',
  boxShadow: "0 2px 4px rgba(0,0,20,.08),0 1px 2px rgba(0,0,20,.08)",
  borderRadius: '20px'
};
// set style for header
//********************* */
const headerStyle = {
  margin: 'auto',
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "white",
  padding: "10px 20px",
  boxShadow: "0 2px 4px rgba(0,0,20,.08),0 1px 2px rgba(0,0,20,.08)",
  borderRadius: '15px'
};
// set style for content
//********************* */
const contentStyle = {
  backgroundColor: " #f1f5f9",

};
// set style for footer
//********************* */
const footerStyle = {
  backgroundColor: "white",
  borderRadius: '15px'
};
// set set style for drawer
//********************* */
const drawerStyles = {
  minHeight: "100vh",
};
const MainPage = () => {
  const { collapse } = useSelector((state) => state.SideMenu);
  const [sideMenu, setSideMenu] = useState(Boolean);
  const dispatch = useDispatch();

  // set window size for responsive
  //*********************** */
  const setWindow = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth >= 576) {
      setSideMenu(true);
    } else if (windowWidth < 576) {
      setSideMenu(false);
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
    <div>
      {window.addEventListener("resize", setWindow)}
      <Layout style={layoutStyle}>
        {sideMenu || windowDefault() ? (
          <Affix offsetTop={0}>
            <Sider
              style={siderStyle}
              width={250}
              trigger={null}
              collapsible
              collapsed={collapse}
            >
              <SideMenu />
            </Sider>
          </Affix>
        ) : (
          <Affix offsetTop={0}>
            <Drawer
              title={<div className="drawer-header"></div>}
              style={drawerStyles}
              closeIcon={null}
              width='auto'
              open={collapse}
              placement="left"
              onClose={() => {
                dispatch(sideMenuAction.closeSideMenu());
              }}
            >
              <SideMenu />
            </Drawer>
          </Affix>
        )}
        <Layout className="container">
          <Affix offsetTop={0}>
            <Header style={headerStyle}>
              <MainHeader />
            </Header>
          </Affix>

          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <Footer style={footerStyle}>
            <MainFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainPage;
