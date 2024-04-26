import { store } from ".."
import { faceDetectionActions } from "./slice"

export const socketListener = (socket)=>{
  socket.on("addList", (payload)=>{
    store.dispatch(faceDetectionActions.offList(payload))
  })
  console.log('jaja');
}
