import { createSlice } from "@reduxjs/toolkit";
import {
  createPoseDetectionSetting,
  deletePoseDetectionSetting,
  getPoseDetectionDetail,
  getPoseDetectionSetting,
  updatePoseDetectionSetting,
} from "./thunkAction";

const initialState = {
  poseDetectionSetting: null,
  poseDetectionDetail: null,
  updatePoseDetection: true,
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
          state.poseDetectionSetting = action.payload;
        })
        //get pose alert setting detail
        .addCase(getPoseDetectionDetail.fulfilled, (state, action) => {
          state.poseDetectionDetail = action.payload;
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
        });
    },
  });
