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
import { AllList } from "../models/FaceDetecetion/ALlList.js";
import { Indentify } from "../models/FaceDetecetion/Identify.js";
import { NotifiTime } from "../models/FaceDetecetion/NotifiTime.js";
import moment from "moment";
import { NotifiCamera } from "../models/FaceDetecetion/NotifiCamera.js";
const route = express.Router();
// get all list
//********* */
route.get("/", async (req, res, next) => {
  const email = req.query.email;
  const listId = req.query.listId;
  try {
    const data = await getFaceDetection(email, listId);
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
  const date = req.query.date;
  const streamId = req.query.streamId;
  try {
    const data = await getOffListFace(date, streamId);
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
  const streamId = req.body.stream_id;
  const vaId = req.body.va_id;
  const age = req.body.age;
  const gender = req.body.gender;
  const mask = req.body.mask;
  const createAt = req.body.createAt;
  try {
    const newList = new Indentify(streamId, vaId, age, gender, mask);
    const notification = await getAllNotification();
    const camera = "camera";
    const startTime = "startTime";
    const endTime = "endTime";
    const date = "date";

    newList
      .addList()
      .then(async () => {
        let checkSetting = true;
        //setting structure of notification
        if (notification?.length > 0) {
          for (let i = 0; i < notification.length; i++) {
            const [camaras] = await NotifiCamera.findWarningCamera(
              notification[i].id
            );
            notification[i][camera] = camaras?.map((cam) => cam.streamId);
          }
          for (let i = 0; i < notification.length; i++) {
            const [times] = await NotifiTime.findWarningTime(
              notification[i].id
            );
            notification[i][startTime] = times?.map((item) => item.start_time);
            notification[i][endTime] = times?.map((item) => item.end_time);
          }
          for (let i = 0; i < notification.length; i++) {
            const [dates] = await NotifiTime.findWarningDate(
              notification[i].id
            );
            notification[i][date] = dates
              ?.map((item) => item.day_of_week)
              .toString();
          }
        }

        // //check warning condition
        notification?.forEach((item) => {
          //check status
          const checkStatus = item.status.toString("hex");
          if (checkStatus === "00") {
            checkSetting = false;
            return;
          } else {
            checkSetting = true;
          }
          //check camera
          const checkCamera = item.camera.find(
            (element) => element === newList.stream_id
          );
          if (checkCamera === undefined) {
            checkSetting = false;
            return;
          } else {
            checkSetting = true;
          }
          //check mask
          const checkMask = item.mask
            .split(",")
            .find((element) => element === newList.mask.toString());
          if (checkMask === undefined) {
            checkSetting = false;
            return;
          } else {
            checkSetting = true;
          }
          //check gender
          const checkGender = item.gender
            .split(",")
            .find((element) => element === newList.gender.toString());
          if (checkGender === undefined) {
            checkSetting = false;
            return;
          } else {
            checkSetting = true;
          }
          //check age
          const checkAge = item.age.split("-").map((x) => +x);
          const newAge = newList.age.split("-").map((x) => +x);
          if (newAge[0] <= checkAge[0] || newAge[1] >= checkAge[1]) {
            checkSetting = false;
            return;
          } else if (newAge[0] >= checkAge[0] && newAge[1] <= checkAge[1]) {
            checkSetting = true;
          }
          //check time
          const createAt = moment().format("YYYY-MM-DD HH:mm:ss");
          const hours = moment().format("HH:mm").split(":");
          const hour = Number(hours[0]) * 60 + Number(hours[1]);
          const [checkStartHours] = item.startTime.map((element) => {
            return element.split(":");
          });
          const checkStartTime =
            Number(checkStartHours[0]) * 60 + Number(checkStartHours[1]);
          const [checkEndHours] = item.endTime.map((element) => {
            return element.split(":");
          });
          const checkEndTime =
            Number(checkEndHours[0]) * 60 + Number(checkEndHours[1]);
          if (hour < checkStartTime || hour > checkEndTime) {
            checkSetting = false;
            return;
          } else if (hour >= checkStartTime && hour <= checkEndTime) {
            checkSetting = true;
          }

          // check date
          const date = moment().day();
          const checkDate = item.date
            .split(",")
            .find((day) => Number(day) === date);
          if (checkDate === undefined) {
            checkSetting = false;
            return;
          } else {
            checkSetting = true;
          }
          //check warning
          if (checkSetting) {
            console.log(item.name);
            console.log(newList);
            io.emit("warning", {
              type: 'face alert',
              check: checkSetting,
              object: newList,
              notification: {
                notifiId: item.id,
                notifiName: item.name,
                notifiTime: createAt,
              },
            });
          }
        });
        io.emit("addList", newList);
        res.status(200).json({
          message: "create new list successfully",
          content: newList,
          statusCode: res.statusCode,
        });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
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

//get camera event
route.get('/getAllCameraIdentfy', async(req, res, next)=>{
  const date = req.query.date
  try {
    const [data] = await AllList.getCameraAllListByDate(date)
    return res.status(200).json({
      message: 'get camara itdentify successfully',
      content: data
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
    next(error)
  }
})
//get quantity in list and out list
route.get('/getIdentifyStats', async(req, res, next)=>{
  const date = req.query.date;
  try {
    const [inList] = await AllList.getAllInList(date);
    const [outList] = await AllList.getAllOutList(date);
    const result = [
      {name: 'InList', quantity: 0},
      {name: 'OutList', quantity: 0}
    ]
    if(inList && outList) {
      result[0].quantity = inList[0].inList
      result[1].quantity = outList[0].outList

    }
    res.status(200).json({
      message: 'get identify stats successfully',
      content:result
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
    next(error)
  }
})

export default route;
