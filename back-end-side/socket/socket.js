import { Server } from "socket.io";
import express from 'express';
import cors from "cors";
import http from 'http'
const app = express();

app.use(cors());
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket)=>{
  console.log("server is connecting",socket.id);
  socket.on("disconnection", ()=> {
    console.log("server is disconnect");
  })
})

export {app, server, io}