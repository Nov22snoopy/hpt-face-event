import { store } from ".."
import { faceDetectionActions } from "./slice"

export const socketListener = (socket)=>{
  socket.on("offList", (payload)=>{
    store.dispatch(faceDetectionActions.offListL(payload))
  })
  console.log('jaja');
}
