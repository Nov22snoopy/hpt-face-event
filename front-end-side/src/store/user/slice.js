import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, login, logout } from "./thunkAction";

const initialState = {
  user: undefined,
  allUser: null,
  loadingProccess: false
};

export const { reducer: userServiceReducer, actions: userServiceActions } =
  createSlice({
    name: "userService",
    initialState,
    reducers: {
      getUser: (state, action) => {
        const data = localStorage.getItem("user");
        if (data) {
          state.user = JSON.parse(data);
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllUser.fulfilled, (state, action) => {
          state.allUser = action.payload;
        })
        .addCase(login.pending, (state,action)=>{
          state.loadingProccess = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          state.loadingProccess = false;
          localStorage.setItem("user", JSON.stringify(action.payload));
        })
        .addCase(login.rejected, (state,action)=>{
          state.loadingProccess = false;
        })
        .addCase(logout.fulfilled, (state, action)=>{
          localStorage.removeItem("user");
          state.user = undefined;
        })

    },
  });
