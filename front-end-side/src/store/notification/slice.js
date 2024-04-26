import { createSlice } from "@reduxjs/toolkit"
import { createNotification, getAllNotification, getNotificationDetail } from "./thunkAction"

const initialState = {
  updateNotification: true,
  notification: null,
  notificationDetail: null

}

export const {reducer: notificationReducer, actions: notificationAction} = createSlice({
  name: 'notification',
  initialState,
  reducers: {

  },
  extraReducers: (buidler) => {
    buidler
    .addCase(getAllNotification.fulfilled, (state, action)=>{
      state.notification = action.payload
    })

    //get notification detail
    .addCase(getNotificationDetail.fulfilled, (state, action)=>{
      state.notificationDetail = action.payload
    })
    //create new notification
    .addCase(createNotification.pending, (state)=>{
      state.updateNotification = false
    })
    .addCase(createNotification.fulfilled, (state)=>{
      state.updateNotification = true
    })
    .addCase(createNotification.rejected, (state)=>{
      state.updateNotification = false
    })
  }
})