import express from "express";
import {
  caculateOT,
  caculateTimekeeping,
  getAllListAttendance,
  getAllListByDate,
  getFaceDetection,
  getOffListAge,
  getOffListFace,
  getOffListGender,
  getTimekeepingDetail,
} from "../controller/index.js";
import { AllList } from "../models/ALlList.js";

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
export default route;

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

//get all list by date
//****************** */
route.post("/allListByDate", async (req, res, next) => {
  try {
    const data = await getAllListByDate(req.body.date);
    const result = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i]?.id !== data[i + 1]?.id) {
        result.push(data[i]);
      }
    }
    //caculate working time
    const timekeeping = "timekeeping";
    if (result.length >= 1) {
      for (let j = 0; j < result.length; j++) {
        let hours = await caculateTimekeeping(result[j].id, req.body.date);
        result[j][timekeeping] = hours;
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
//caculate timekeeping
// route.post("/caculateTimekeeping", async (req, res, next) => {
//   try {
//     const data = await caculateTimekeeping(req.body.id, req.body.date);
//     const time = data?.map((t) => t.time);
//     let timekeeping = [];
//     let result = 0;
//     if (time) {
//       for (let i = 0; i < time?.length; i++) {
//         timekeeping.push(time[i].split(":"));
//         result =
//           Number(timekeeping[timekeeping.length - 1][0]) * (60000 * 60) +
//           Number(timekeeping[timekeeping.length - 1][1]) * 60000 -
//           (Number(timekeeping[0][0]) * (60000 * 60) +
//             Number(timekeeping[0][1]) * 60000);
//       }
//     }
//     let ot = ((result * 1.667e-5) / 60 - 8).toFixed(1);
//     return res.status(200).json({
//       message: "caculating timekeeping successfully",
//       content: ot,
//       statusCode: 200,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//     next(error);
//   }
// });

//get check in check out detail

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
    const result = {
      absent: 0,
      fulltime: 0,
      overTime: 0,
      leaveSoon: 0,
    };
    for (let i = 0; i < attendanceList.length; i++) {
      if (attendanceList[i]?.id !== attendanceList[i + 1]?.id) {
        uniqueList.push(attendanceList[i]);
      }
    }
    if (allList && uniqueList.length > 0) {
      for (let i = 0; i < allList?.length; i++) {
        for (let j = 0; j < uniqueList.length; j++) {
          if (uniqueList[j].id !== allList[i].id) {
            result.absent += 1;
          }
        }
      }
    }
    if (uniqueList.length >= 1) {
      for (let j = 0; j < uniqueList.length; j++) {
        let hours = await caculateTimekeeping(uniqueList[j].id, req.body.date);
        if (hours === 0) {
          result.fulltime += 1
        }
        if (hours < 0) {
          result.leaveSoon += 1
        }
      }
    }
    if (uniqueList.length >= 1) {
      for (let j = 0; j < uniqueList.length; j++) {
        let hours = await caculateOT(uniqueList[j].id, req.body.date);
        if (hours > 0) {
          result.overTime += 1
        }
      }
    }
    console.log(uniqueList);
    res.status(200).json({
      message: 'get attendance successfully',
      content: result
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
