import { createSlice } from "@reduxjs/toolkit";
import {
  createPoseDetectionEvent,
  createPoseDetectionSetting,
  deletePoseDetectionEvent,
  deletePoseDetectionSetting,
  getAllPoseDetectionEvent,
  getCameraPoseEvent,
  getPoseDetectionDetail,
  getPoseDetectionEventDetail,
  getPoseDetectionSetting,
  getPoseWarningStats,
  updatePoseDetectionSetting,
} from "./thunkAction";

const initialState = {
  poseDetectionSetting: null,
  poseDetectionDetail: null,
  updatePoseDetection: true,
  poseDetectionEvent: null,
  poseDetectionEventDetail: null,
  cameraPoseWarning: null,
  poseWarningStats: null
};

export const { reducer: poseDetectionReducer, actions: poseDetectionActions } =
  createSlice({
    name: "poseDetection",
    initialState,
    reducers: {
      // clear pose alert setting detail
      clearPoseDetectionDetail: (state) => {
        state.poseDetectionDetail = null;
      },
    },
    extraReducers: (buidler) => {
      buidler
        .addCase(getPoseDetectionSetting.fulfilled, (state, action) => {
          state.poseDetectionSetting = [...action.payload];
        })
        //get pose alert setting detail
        .addCase(getPoseDetectionDetail.fulfilled, (state, action) => {
          state.poseDetectionDetail = [...action.payload];
        })
        //create new pose alert setting
        .addCase(createPoseDetectionSetting.pending, (state) => {
          state.updatePoseDetection = false;
        })
        .addCase(createPoseDetectionSetting.fulfilled, (state) => {
          state.updatePoseDetection = true;
        })
        .addCase(createPoseDetectionSetting.rejected, (state) => {
          state.updatePoseDetection = true;
        })
        //update pose alert setting
        .addCase(updatePoseDetectionSetting.pending, (state) => {
          state.updatePoseDetection = false;
        })
        .addCase(updatePoseDetectionSetting.fulfilled, (state) => {
          state.updatePoseDetection = true;
        })
        .addCase(updatePoseDetectionSetting.rejected, (state) => {
          state.updatePoseDetection = true;
        })
        //delete pose alert setting
        .addCase(deletePoseDetectionSetting.pending, (state) => {
          state.updatePoseDetection = false;
        })
        .addCase(deletePoseDetectionSetting.fulfilled, (state) => {
          state.updatePoseDetection = true;
        })
        .addCase(deletePoseDetectionSetting.rejected, (state) => {
          state.updatePoseDetection = true;
        })
        //create pose alert event
        .addCase(createPoseDetectionEvent.pending, (state) => {
          state.updatePoseDetection = false;
        })
        .addCase(createPoseDetectionEvent.fulfilled, (state) => {
          state.updatePoseDetection = true;
        })
        .addCase(createPoseDetectionEvent.rejected, (state) => {
          state.updatePoseDetection = true;
        })
        //get all pose alert event
        .addCase(getAllPoseDetectionEvent.fulfilled, (state, action)=> {
          state.poseDetectionEvent = [...action.payload]
        })
        //get pose alert event detail
        .addCase(getPoseDetectionEventDetail.fulfilled, (state, action)=>{
          state.poseDetectionEventDetail = [...action.payload]
        })
        //delete pose alert event
        .addCase(deletePoseDetectionEvent.pending, (state) => {
          state.updatePoseDetection = false;
        })
        .addCase(deletePoseDetectionEvent.fulfilled, (state) => {
          state.updatePoseDetection = true;
        })
        .addCase(deletePoseDetectionEvent.rejected, (state) => {
          state.updatePoseDetection = true;
        })
        //get camera pose warning event 
        .addCase(getCameraPoseEvent.fulfilled, (state, action)=>{
          state.cameraPoseWarning = [...action.payload]
        })
        //get pose warning stats
        .addCase(getPoseWarningStats.fulfilled, (state, action)=>{
          state.poseWarningStats = [...action.payload]
        })
      },  
  });
