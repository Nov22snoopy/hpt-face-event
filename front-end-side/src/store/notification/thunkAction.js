import { createAsyncThunk } from "@reduxjs/toolkit";
import { notificationService } from "../../service/notification.Service";
import { message } from "antd";

//get all notification
export const getAllNotification = createAsyncThunk('/notification', async(_,{rejectWithValue})=>{
  try {
    const res = await notificationService.getAllNotification();
    return res.data.content;
  } catch (error) {
    return rejectWithValue(error)
  }
})


//get notification detail
export const getNotificationDetail = createAsyncThunk('/notification/id', async(query,{rejectWithValue})=>{
  try {
    const res = await notificationService.getNotificationDetail(query);
    return res.data.content
  } catch (error) {
    return rejectWithValue(error)
  }
})

// create notification 
export const createNotification = createAsyncThunk('/notification/createNotification', async(payload, {rejectWithValue})=>{
  try {
    const res = await notificationService.createNewNotification(payload)
    if(res.data.statusCode === 200) {
      message.success("create notification successfully")
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})