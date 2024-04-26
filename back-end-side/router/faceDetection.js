import express from "express";
import {
  caculateOT,
  caculateTimekeeping,
  getAllCamera,
  getAllListAttendance,
  getAllListByDate,
  getAllListByMail,
  getAllNotification,
  getCamera,
  getFaceDetection,
  getListFace,
  getOffListAge,
  getOffListFace,
  getOffListGender,
  getTimeCheck,
  getTimekeepingDetail,
} from "../controller/index.js";
import { io } from "../socket/socket.js";
import { AllList } from "../models/ALlList.js";
import { Indentify } from "../models/Identify.js";
import { Notification } from "../models/Notification.js";

const route = express.Router();
// get all list
//********* */
route.get("/", async (req, res, next) => {
  try {
    const data = await getFaceDetection();
    res.status(200).json({
      message: "Get face detection data successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
//get off list
//********* */
route.get("/offList", async (req, res, next) => {
  try {
    const data = await getOffListFace();
    return res.status(200).json({
      message: "get off list successfully",
      content: data,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get all age user of off-list by date
//********************************** */
route.post("/offListAge", async (req, res, next) => {
  try {
    const data = await getOffListAge(req.body.date);
    return res.status(200).json({
      message: "get off list successfully",
      content: data,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get user gender of off-list by date
//******************************** */
route.post("/offListGender", async (req, res, next) => {
  try {
    const data = await getOffListGender(req.body.date);
    return res.status(200).json({
      message: "get off list successfully",
      content: data,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get all list by month
//****************** */
route.post("/allListByDate", async (req, res, next) => {
  const email = req.body.email;
  const date = req.body.date;
  const list_id = req.body.list_id;
  try {
    const data = await getAllListByDate(date, list_id, email);
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.id !== data[i + 1]?.id) {
        result.push(data[i]);
      }
    }
    //caculate working time
    const totaltime = "totaltime";
    if (result.length >= 1) {
      for (let j = 0; j < result.length; j++) {
        let hours = await caculateTimekeeping(result[j].id, req.body.date);
        result[j][totaltime] = hours;
      }
    }
    //caculate over time
    const ot = "over_time";
    if (result.length >= 1) {
      for (let j = 0; j < result.length; j++) {
        let hours = await caculateOT(result[j].id, req.body.date);
        result[j][ot] = hours;
      }
    }
    //get check in check out time
    const checkIn = "check_in";
    const checkOut = "check_out";
    if (result.length >= 1) {
      for (let j = 0; j < result.length; j++) {
        const hours = await getTimeCheck(result[j].id, req.body.date);
        result[j][checkIn] = hours[0];
        result[j][checkOut] = hours[1];
      }
    }
    //get camera
    const cameraIn = "camera_in";
    const cameraOut = "camera_out";
    if (result.length >= 1) {
      for (let j = 0; j < result.length; j++) {
        const camera = await getCamera(result[j].id, req.body.date);
        result[j][cameraIn] = camera[0];
        result[j][cameraOut] = camera[1];
      }
    }
    res.status(200).json({
      message: "get all list by date successfully",
      content: result,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
//get check in check out time detail
//******************************** */
route.post("/timeDetail", async (req, res, next) => {
  try {
    const data = await getTimekeepingDetail(req.body.id, req.body.date);
    res.status(200).json({
      message: "get detail successfully",
      content: data,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//update time check out
//****************** */
route.post("/updateCheckOut", async (req, res, next) => {
  try {
    const data = new AllList(
      req.body.list_id,
      req.body.list_item_id,
      req.body.stream_id,
      req.body.va_id,
      req.body.gender,
      req.body.created_at
    );
    data
      .updateCheckOut()
      .then(
        res.status(200).json({
          message: "update check out successfully",
          content: data,
          statusCode: res.statusCode,
        })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get all list attendance
//********************* */
route.post("/allListAttendance", async (req, res, next) => {
  try {
    const allList = await getAllListAttendance();
    const attendanceList = await getAllListByDate(req.body.date);
    const uniqueList = [];
    const result = [
      { status: "absent", quantity: 0 },
      { status: "fulltime", quantity: 0 },
      { status: "leaveSoon", quantity: 0 },
      { status: "overTime", quantity: 0 },
    ];

    for (let i = 0; i < attendanceList.length; i++) {
      if (attendanceList[i]?.id !== attendanceList[i + 1]?.id) {
        uniqueList.push(attendanceList[i]);
      }
    }

    if (uniqueList.length >= 1) {
      let attendance = 0;
      for (let i = 0; i < uniqueList?.length; i++) {
        for (let j = 0; j < allList?.length; j++) {
          if (allList[j].id === uniqueList[i].id) {
            attendance += 1;
            result[0].quantity = Number(allList?.length) - attendance;
          }
        }
      }
    }

    if (uniqueList.length >= 1) {
      for (let j = 0; j < uniqueList.length; j++) {
        let hours = await caculateTimekeeping(uniqueList[j].id, req.body.date);
        let ot = await caculateOT(uniqueList[j].id, req.body.date);
        if (hours === 8 || (hours >= 8.5 && hours <= 9)) {
          result[1].quantity += 1;
        }
        if (hours < 8 && ot <= 0) {
          result[2].quantity += 1;
        }
        if (ot > 0) {
          result[3].quantity += 1;
        }
      }
    }

    res.status(200).json({
      message: "get attendance successfully",
      content: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
//get all list face
//********************* */
route.get("/listFace", async (req, res, next) => {
  try {
    const data = await getListFace();
    res.status(200).json({
      message: "get all list face successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get all list item
route.get("/allListByMail", async (req, res, next) => {
  try {
    const data = await getAllListByMail(req.query.email, req.query.list_id);
    res.status(200).json({
      message: "get all list item successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

// create new list
route.post("/addList", async (req, res, next) => {
  try {
    const newList = new Indentify(
      req.body.stream_id,
      req.body.va_id,
      req.body.age,
      req.body.gender,
      req.body.mask
    );
    newList.addList();
    io.emit("addList", newList);
    res.status(200).json({
      message: "create new list successfully",
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});


//get all camera
route.get("/camera", async (req, res, next) => {
  try {
    const data = await getAllCamera();
    res.status(200).json({
      message: "get all camera successfully",
      content: data,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});




export default route;
