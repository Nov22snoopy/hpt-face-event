import { createAsyncThunk } from "@reduxjs/toolkit";
import { faceDetectionService } from "../../service/FaceDetection.service";
import { offListService } from "../../service/OffList.service";
import { message } from "antd";

export const getAllFaceDetection = createAsyncThunk(
  "/faceDetection",
  async (_, { rejectWithValue }) => {
    try {
      const res = await faceDetectionService.getAllFaceDetection();
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOffList = createAsyncThunk(
  "/faceDetection/offList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await offListService.getOffList();
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOffListAge = createAsyncThunk(
  "/faceDetection/offListAge",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await offListService.getOffListAge(payload);
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get gender in off list by date
export const getOffListGender = createAsyncThunk(
  "/faceDetection/offListGender",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await offListService.getOffListGender(payload);
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get all list by date
export const getAllListByDate = createAsyncThunk(
  "/faceDetection/allListByDate",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await faceDetectionService.getAllListByDate(payload);
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// // caculating timekeeping by date
// export const caculateTimekeeping = createAsyncThunk(
//   "/faceDetection/caculateTimekeeping",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const res = await faceDetectionService.caculateTimekeeping(payload);
//       return res.data.content
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// );

// get time check in check out detail 
export const getTimeDetail = createAsyncThunk('/faceDetection/timeDetail', async(payload, {rejectWithValue})=>{
  try {
    const res = await faceDetectionService.getTimeDetail(payload);
    if (res.data.statusCode === 200) {
      return res.data.content
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})

//update time check out
export const updateTimeOut = createAsyncThunk('/faceDetection/updateCheckOut', async(payload,{rejectWithValue})=>{
  try {
    const res = await faceDetectionService.updateTimeOut(payload)
    if(res.data.statusCode === 200) {
      message.success('Update time out successfully!!')
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})