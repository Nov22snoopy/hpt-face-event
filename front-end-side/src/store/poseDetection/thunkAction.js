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
export const deletePoseDetectionSetting = createAsyncThunk(
  `/poseDetectio/deletePoseDetectionSetting`,
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.deletePoseDetectionSetting(query);
      if (res.data.statusCode === 200) {
        message.success(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//create pose alert event
export const createPoseDetectionEvent = createAsyncThunk(
  `/poseDetection/createPoseDetectionEvent`,
  async (payload, { rejectWithValue }) => {
    try {
      await poseDetectionService.createPoseDetectionEvent(payload);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get all pose alert event
export const getAllPoseDetectionEvent = createAsyncThunk(
  `/poseDetection/getAllPoseDetectionEvent`,
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.getAllPoseDetectionEvent(query);
      if (res.data.statusCode === 200) {
        return res.data.content;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get pose alert event detail
export const getPoseDetectionEventDetail = createAsyncThunk(
  `/poseDetection/getPoseDetectionEventDetail`,
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.getPoseDetectionEventDetail(query);
      if (res.data.statusCode === 200) {
        return res.data.content;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete pose alert event
export const deletePoseDetectionEvent = createAsyncThunk(
  `/poseDetection/deletePoseDetectionEvent`,
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.deletePoseDetectionEvent(query);
      if (res.data.statusCode === 200) {
        message.success(res.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get camera pose warning event
export const getCameraPoseEvent = createAsyncThunk(
  "/poseDetection/getCameraPoseEvent",
  async (query, { rejectWithValue }) => {
    try {
      const res = await poseDetectionService.getCameraPoseEvent(query);
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get pose warning stats
export const getPoseWarningStats = createAsyncThunk(`/poseDetection/getPoseWarningStats`, async(query, {rejectWithValue})=>{
  try {
    const res = await poseDetectionService.getPoseWarningStats(query)
    return res.data.content
  } catch (error) {
    return rejectWithValue(error) 
  }
})