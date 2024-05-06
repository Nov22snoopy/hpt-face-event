import {Outlet } from "react-router-dom";
import React from "react";
import "./faceDetection.css";

const FaceDetection = () => {
  // render ui component
  //********************* */
  return (
    <div className=" mt-4 pt-5 mb-2 ">
      <div className=" text-white md:mb-0 mb-3 flex justify-start items-center">
        <div className="face-detection-header md:text-xl text-lg ">
          <h1>Face Detection</h1>
        </div>
        {/* <div className="grid md:grid-cols-4 grid-cols-2 justify-center text-center">
          <NavLink
            defaultChecked
            to="/faceDetection/authorizationList"
            className="nav_item text-lg"
          >
            All List
          </NavLink>

          <NavLink
            className="nav_item hover:bg-light text-lg"
            to="/faceDetection/offList"
          >
            Off List
          </NavLink>
          <NavLink className="nav_item hover:bg-light text-lg" to={"/faceDetection/chart"}> 
            Chart
          </NavLink>
          <NavLink className="nav_item hover:bg-light text-lg" to={"/faceDetection/timekeeping"}> 
            Timekeeping
          </NavLink>
        </div> */}
      </div>
      <Outlet />
    </div>
  );
};

export default FaceDetection;
