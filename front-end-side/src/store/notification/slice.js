import { createSlice } from "@reduxjs/toolkit";
import {
  createNotification,
  deleteNotifiEvent,
  deleteNotification,
  getAllNotifiEvent,
  getAllNotification,
  getNotifiEventDetail,
  getNotificationDetail,
  updateNotification,
  updateStatus,
} from "./thunkAction";

const initialState = {
  updateNotification: true,
  notification: null,
  notificationDetail: null,
  allNotifiEvent: null,
  notifiEventDetail: null,
};

export const { reducer: notificationReducer, actions: notificationAction } =
  createSlice({
    name: "notification",
    initialState,
    reducers: {
      clearNotifiDetail: (state) => {
        state.notificationDetail = null;
      },
      clearNofifiEventDetai: (state) => {
        state.notifiEventDetail = null
      }
    },
    extraReducers: (buidler) => {
      buidler
        .addCase(getAllNotification.fulfilled, (state, action) => {
          state.notification = action.payload;
        })

        //get notification detail
        .addCase(getNotificationDetail.fulfilled, (state, action) => {
          state.notificationDetail = action.payload;
        })
        //create new notification
        .addCase(createNotification.pending, (state) => {
          state.updateNotification = false;
        })
        .addCase(createNotification.fulfilled, (state) => {
          state.updateNotification = true;
        })
        .addCase(createNotification.rejected, (state) => {
          state.updateNotification = true;
        })
        //update notification
        .addCase(updateNotification.pending, (state) => {
          state.updateNotification = false;
        })
        .addCase(updateNotification.fulfilled, (state) => {
          state.updateNotification = true;
        })
        .addCase(updateNotification.rejected, (state) => {
          state.updateNotification = true;
        })
        //update status
        .addCase(updateStatus.pending, (state) => {
          state.updateNotification = false;
        })
        .addCase(updateStatus.fulfilled, (state) => {
          state.updateNotification = true;
        })
        .addCase(updateStatus.rejected, (state) => {
          state.updateNotification = true;
        })
        //delete notification
        .addCase(deleteNotification.pending, (state) => {
          state.updateNotification = false;
        })
        .addCase(deleteNotification.fulfilled, (state) => {
          state.updateNotification = true;
        })
        .addCase(deleteNotification.rejected, (state) => {
          state.updateNotification = true;
        })
        //get all notification event
        .addCase(getAllNotifiEvent.fulfilled, (state, actions) => {
          state.allNotifiEvent = actions.payload;
        })
        //get notification event detail
        .addCase(getNotifiEventDetail.fulfilled, (state, action)=>{
          state.notifiEventDetail = action.payload
        })
        //delete notification event
        .addCase(deleteNotifiEvent.pending, (state) => {
          state.updateNotification = false;
        })
        .addCase(deleteNotifiEvent.fulfilled, (state) => {
          state.updateNotification = true;
        })
        .addCase(deleteNotifiEvent.rejected, (state) => {
          state.updateNotification = true;
        })
    },
  });
