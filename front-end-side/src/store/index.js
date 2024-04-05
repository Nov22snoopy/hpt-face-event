import { configureStore } from "@reduxjs/toolkit";
import {sideMenuReducer } from "./SideMenu/slice";
import { userServiceActions, userServiceReducer } from "./user/slice";
import { faceDetectionReducer } from "./faceDetection/slice";

export const store = configureStore ({
  reducer:{
    SideMenu: sideMenuReducer,
    UserService: userServiceReducer,
    FaceDetectionService: faceDetectionReducer
  },
})
store.dispatch(userServiceActions.getUser())