import { createAsyncThunk } from "@reduxjs/toolkit";
import { socketClient } from "../..";
import { io } from "socket.io-client";

export const connectSocket = createAsyncThunk("connectSocket", async (payload, thunkApi) => {
  try {
    thunkApi.extra.socket = io.connect("http://localhost:8080", { transports: ['websocket'] });
    // return await socketClient.connect();
  } catch (error) {
    console.log(error);
  }
});

// export const disconnectSocket = createAsyncThunk(
//   "disconnectSocket",
//   async () => {
//     try {
//       return await socketClient.disconnect();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

