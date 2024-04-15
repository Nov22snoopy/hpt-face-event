import { configureStore  } from "@reduxjs/toolkit";
import {sideMenuReducer } from "./SideMenu/slice";
import { userServiceActions, userServiceReducer } from "./user/slice";
import { faceDetectionReducer } from "./faceDetection/slice";
import { socketReducer } from "./socket/slice";

export const store = configureStore ({
  reducer:{
    SideMenu: sideMenuReducer,
    UserService: userServiceReducer,
    FaceDetectionService: faceDetectionReducer,
    SocketService: socketReducer
  },
  middleware: (getDefaultMiddeleware)=> 
    getDefaultMiddeleware({
      serializableCheck: false,
      thunk: {
        extraArgument :{
          socket: undefined,
        }
      }
    })
  
})
store.dispatch(userServiceActions.getUser())
