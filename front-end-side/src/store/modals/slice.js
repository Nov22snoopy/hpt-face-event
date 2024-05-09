import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationForm: false,
  warningFaceModal: false,
  poseAlertModal: false
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
    },
    //open warning face modal
    openWanringFaceModal:(state,action)=> {
      state.warningFaceModal = action.payload
    },
     //close warning face modal
     closeWanringFaceModal:(state)=> {
      state.warningFaceModal = false
    },
    //opem pose alert form modal
    openPoseAlertModal: (state) => {
      state.poseAlertModal = true
    },
    //close pose alert form modal
    closePoseAlertModal:(state)=>{
      state.poseAlertModal = false
    }
  },
  
})