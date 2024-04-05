import express from "express";
import dotenv from "dotenv";
import userRoute from "./router/user.js";
import faceDetectionRoute from './router/faceDetection.js'
import morgan from "morgan";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // if(req.method === 'OPTIONS') {
  //   res.header('Access-Control-Allow-Methods ', 'PUT, POST, PATCH, DELETE, GET')
  //   return res.status(200).json({})
  // }
  next();
});

app.use("/user", userRoute);
app.use("/faceDetection",faceDetectionRoute)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server is listenning on port 8080");
});
