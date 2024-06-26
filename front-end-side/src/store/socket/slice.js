import { createSlice } from "@reduxjs/toolkit"
import { connectSocket } from "./thunkAction"

const initialState = {
  connectStatus:"",
  socket: null
}
export const { reducer: socketReducer, actions: socketAction} = createSlice({
  name: 'socket',
  initialState,
  reducers: {

  },
  extraReducers:(buidler) => {
    buidler
    .addCase(connectSocket.fulfilled, (state, actions)=>{
      state.connectStatus ='connected'
      state.socket =  actions.payload
    })
  }
})