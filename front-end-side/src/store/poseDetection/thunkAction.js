import { createAsyncThunk } from "@reduxjs/toolkit";
import { poseDetectionService } from "../../service/PoseDetection.service";
import { message } from "antd";

//display all pose alert setting and search
export const getPoseDetectionSetting = createAsyncThunk(
  "/poseDetection",
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.getPoseDetection(query);
      if (res.data.statusCode === 200) {
        return res.data.content;
      }
    } catch (error) {}
  }
);

//get pose alert setting detail
export const getPoseDetectionDetail = createAsyncThunk(
  "/poseDetection/getPoseDetecionDetail",
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.getPoseDetectionDetail(query);
      if (res.data.statusCode === 200) {
        return res.data.content;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//create new pose alert setting
export const createPoseDetectionSetting = createAsyncThunk(
  `/poseDetection/createPoseDetectionSetting`,
  async (payload, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.createPoseDetectionSetting(
        payload
      );
      if (res.data.statusCode === 200) {
        message.success(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update pose alert setting
export const updatePoseDetectionSetting = createAsyncThunk(
  "/poseDetection/updatePoseDetectionSetting",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.updatePoseDetectionSetting(
        payload.id,
        payload
      );
      if (res.data.statusCode === 200) {
        message.success(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update pose alert status
export const updatePoseDetectionStatus = createAsyncThunk(
  `/poseDetection/updatePoseDetectionStatus`,
  async (payload, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.updatePoseDetectionStatus(
        payload.id,
        payload
      );
      if (res.data.statusCode === 200) {
        message.success(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete pose alert setting
export const deletePoseDetectionSetting = createAsyncThunk(`/poseDetectio/deletePoseDetectionSetting`, async(query, {rejectWithValue})=>{
  try {
    const res = await poseDetectionService.deletePoseDetectionSetting(query)
    if(res.data.statusCode === 200) {
      message.success(res.data.message)
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})
