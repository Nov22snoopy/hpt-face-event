import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationForm: false
};

export const {reducer: modalReducer, actions: modalActions} = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    //open notification form
    openForm: (state, action) => {
      state.notificationForm = true
    },
    //close notification form
    closeForm: (state, action) => {
      state.notificationForm = false
    }
  },
  
})