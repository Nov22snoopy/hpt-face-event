import { createAsyncThunk } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

export const connectSocket = createAsyncThunk("connectSocket", async (payload, thunkApi) => {
  try {
    thunkApi.extra.socket = io.connect("http://localhost:8080", { transports: ['websocket'] });
    // return await socketClient.connect();
  } catch (error) {
    console.log(error);
  }
});



