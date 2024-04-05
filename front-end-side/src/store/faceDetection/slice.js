import { createSlice } from "@reduxjs/toolkit"
import { getAllFaceDetection, getAllListByDate, getOffList, getOffListAge, getOffListGender, getTimeDetail, updateTimeOut } from "./thunkAction"

const initialState = {
  faceDetection: null,
  loading:null,
  offList: null,
  offListAge: null,
  offListGender: null,
  allListByDate: null,
  timeDetail: null,
  updating: null,
}

export const {reducer: faceDetectionReducer, actions: faceDetectionActions} = createSlice({
  name: 'faceDetectionService',
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder
    //get all list
    .addCase(getAllFaceDetection.fulfilled, (state,actions)=>{
      state.faceDetection = actions.payload;
      state.loading = true
    })
    .addCase(getAllFaceDetection.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getAllFaceDetection.rejected, (state, action)=> {
      state.loading = true
    })
    //get off list
    .addCase(getOffList.fulfilled, (state,actions)=>{
      state.offList = actions.payload;
      state.loading = true
    })
    .addCase(getOffList.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getOffList.rejected, (state, action)=> {
      state.loading = true
    })
    //get off list age
    .addCase(getOffListAge.fulfilled, (state,actions)=>{
      state.offListAge = actions.payload;
      state.loading = true
    })
    .addCase(getOffListAge.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getOffListAge.rejected, (state, action)=> {
      state.loading = true
    })
    //get off list gender by date
    .addCase(getOffListGender.fulfilled, (state,actions)=>{
      state.offListGender = actions.payload;
      state.loading = true
    })
    .addCase(getOffListGender.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getOffListGender.rejected, (state, action)=> {
      state.loading = true
    })
    //get all list by date
    .addCase(getAllListByDate.fulfilled, (state,actions)=>{
      state.allListByDate = actions.payload;
      state.loading = true
    })
    .addCase(getAllListByDate.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getAllListByDate.rejected, (state, action)=> {
      state.loading = true
    })
    //get time check in check out detail
    .addCase(getTimeDetail.fulfilled, (state,actions)=>{
      state.timeDetail = actions.payload;
      state.loading = true
    })
    .addCase(getTimeDetail.pending, (state,actions)=> {
      state.loading = false
    })
    .addCase(getTimeDetail.rejected, (state, action)=> {
      state.loading = true
    })
    //update time out
    .addCase(updateTimeOut.fulfilled, (state,actions)=>{
      state.updating = true
    })
    .addCase(updateTimeOut.pending, (state,actions)=> {
      state.updating = false
    })
    .addCase(updateTimeOut.rejected, (state, action)=> {
      state.updating = true
    })
  }
})