import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  collapse:undefined

}
export const {reducer: sideMenuReducer, actions: sideMenuAction} = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    openSideMenu: (state, action) => {
      state.collapse = true
    },
    closeSideMenu: (state, action) => {
      state.collapse = false
    }
  }
})