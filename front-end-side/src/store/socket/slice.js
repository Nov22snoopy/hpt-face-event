import { createSlice } from "@reduxjs/toolkit"
import { connectSocket, disconnectSocket } from "./thunkAction"

const initialState = {
  connectStatus:"",
}
export const { reducer: socketReducer, actions: socketAction} = createSlice({
  name: 'socket',
  initialState,
  reducers: {

  },
  extraReducers:(buidler) => {
    buidler
    .addCase(connectSocket.fulfilled, (state)=>{
      state.connectStatus ='connected'
    })
    // .addCase(disconnectSocket.fulfilled, (state)=> {
    //   state.connectStatus = 'disconnected'
    // })
  }
})