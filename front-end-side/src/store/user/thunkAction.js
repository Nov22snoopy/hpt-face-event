import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../service/User.service";
import { message } from "antd";

//Get all user's information
export const getAllUser = createAsyncThunk(
  "/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserService.getAllUser();
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//get user detail
export const getUser = createAsyncThunk(
  "/user/",
  async (payload, { rejectWithValue }) => {
    try {
      const res = getUser(payload);
      if (res.data.statusCode === 200) return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Log in user
export const login = createAsyncThunk(
  "/user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await UserService.login(payload);
      if (res.data.statusCode === 200) {
        message.success("Login successfully");
        return res.data.content;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//log out user
export const logout = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await UserService.logout(payload)
      if (res.data.statusCode === 200) {
        message.success("Log out successfully");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
