import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCamera,
  getAllFaceDetection,
  getAllListByDate,
  getAllListByMail,
  getAttendanceList,
  getListFace,
  getOffList,
  getOffListAge,
  getOffListGender,
  getTimeDetail,
  updateTimeOut,
} from "./thunkAction";

const initialState = {
  faceDetection: null,
  loading: null,
  offList: null,
  offListAge: null,
  offListGender: null,
  allListByDate: null,
  timeDetail: null,
  updating: null,
  attendance: null,
  allList: null,
  searchEmail: null,
  listFace: null,
  selectedList: null,
  listId: null,
  cameraList: null,
};

export const { reducer: faceDetectionReducer, actions: faceDetectionActions } =
  createSlice({
    name: "faceDetectionService",
    initialState,
    reducers: {
      //select list face
      selectList: (state, actions) => {
        state.listId = actions.payload;
      },
      //clear select
      clearSelect: (state, actions) => {
        state.listId = null;
      },
      //search by email
      searchEmail: (state, actions) => {
        state.searchEmail = actions.payload;
      },
      //clear search by email
      clearSearch: (state, actions) => {
        state.searchEmail = null;
      },
      //select date
      
    },
    extraReducers: (builder) => {
      builder
        //get all list
        .addCase(getAllFaceDetection.fulfilled, (state, actions) => {
          state.faceDetection = actions.payload;
          state.loading = true;
        })
        .addCase(getAllFaceDetection.pending, (state, actions) => {
          state.loading = false;
        })
        .addCase(getAllFaceDetection.rejected, (state, actions) => {
          state.loading = true;
        })
        //get off list
        .addCase(getOffList.fulfilled, (state, actions) => {
          state.offList = actions.payload;
          state.loading = true;
        })
        .addCase(getOffList.pending, (state, actions) => {
          state.loading = false;
        })
        .addCase(getOffList.rejected, (state, actions) => {
          state.loading = true;
        })
        //get off list age
        .addCase(getOffListAge.fulfilled, (state, actions) => {
          state.offListAge = actions.payload;
          state.loading = true;
        })
        .addCase(getOffListAge.pending, (state, actions) => {
          state.loading = false;
        })
        .addCase(getOffListAge.rejected, (state, actions) => {
          state.loading = true;
        })
        //get off list gender by date
        .addCase(getOffListGender.fulfilled, (state, actions) => {
          state.offListGender = actions.payload;
          state.loading = true;
        })
        .addCase(getOffListGender.pending, (state, actions) => {
          state.loading = false;
        })
        .addCase(getOffListGender.rejected, (state, actions) => {
          state.loading = true;
        })
        //get all list by date
        .addCase(getAllListByDate.fulfilled, (state, actions) => {
          state.allListByDate = actions.payload;
        })
        //get time check in check out detail
        .addCase(getTimeDetail.fulfilled, (state, actions) => {
          state.timeDetail = actions.payload;
          state.loading = true;
        })
        .addCase(getTimeDetail.pending, (state, actions) => {
          state.loading = false;
        })
        .addCase(getTimeDetail.rejected, (state, actions) => {
          state.loading = true;
        })
        //update time out
        .addCase(updateTimeOut.fulfilled, (state, actions) => {
          state.updating = true;
        })
        .addCase(updateTimeOut.pending, (state, actionss) => {
          state.updating = false;
        })
        .addCase(updateTimeOut.rejected, (state, action) => {
          state.updating = true;
        })
        //get attendance list
        .addCase(getAttendanceList.fulfilled, (state, actions) => {
          state.attendance = actions.payload;
        })
        //get all list item
        .addCase(getAllListByMail.fulfilled, (state, actions) => {
          state.allList = actions.payload?.slice(0, 10);
        })
        //get list face
        .addCase(getListFace.fulfilled, (state, actions) => {
          state.listFace = actions.payload;
        })

        //get all camera
        .addCase(getAllCamera.fulfilled, (state, actions) => {
          state.cameraList = actions.payload;
        });
    },
  });
