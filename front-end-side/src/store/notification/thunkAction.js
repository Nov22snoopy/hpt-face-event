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
export const getNotificationDetail = createAsyncThunk('/notification/notificationDetail', async(query,{rejectWithValue})=>{
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

//update notification
export const updateNotification = createAsyncThunk('/notification/updateNotification', async(payload, {rejectWithValue})=>{
  try {
    const res = await notificationService.updateNotification(payload.id, payload)
    if(res.data.statusCode === 200) {
      message.success('Update successfully')
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//update notification 
export const updateStatus = createAsyncThunk('/notification/updateStatus', async(payload, {rejectWithValue})=>{
  try {
    const res = await notificationService.updateStatus(payload.id, payload)
    if(res.data.statusCode === 200) {
      message.success(res.data.message)
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//delete notification
export const deleteNotification = createAsyncThunk('/notification/deleteNotification', async(query, {rejectWithValue})=>{
  try {
    const res = await notificationService.deleteNotification(query)
    if(res.data.statusCode === 200) {
      message.success('Delete Successfully')
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//create warning face event 
export const createEvent = createAsyncThunk('/notification/createEvent', async(payload, {rejectWithValue})=>{
  try {
    const res = await notificationService.createEvent(payload);
    if(res.data.statusCode === 200) {
      return
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//get all notification face event
export const getAllNotifiEvent = createAsyncThunk('/notification/getallNotifiEvent', async(_, {rejectWithValue})=>{
  try {
    const res = await notificationService.getAllNotifiEvent();
    if(res.data.statusCode === 200) {
      return res.data.content
    }
  } catch (error) {
    
  }
})

//get notification event detail
export const getNotifiEventDetail = createAsyncThunk(`/notification/getNotifiEventDetail`, async (query, {rejectWithValue})=>{
  try {
    const res = await notificationService.getNotifiEventDetail(query);
    if(res.data.statusCode === 200){
      return res.data.content
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//delete notification event
export const deleteNotifiEvent = createAsyncThunk('/notification/deleteNotifiEvent', async(query, {rejectWithValue})=>{
  try {
    const res = await notificationService.deleteNotifiEvent(query);
    if(res.data.statusCode === 200){
      message.success('delete warning event successfully')
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})