import express from "express";
import { Notification } from "../models/FaceDetecetion/Notification.js";
import { getAllNotification } from "../controller/index.js";
import { NotifiTime } from "../models/FaceDetecetion/NotifiTime.js";
import moment from "moment";
import { NotifiCamera } from "../models/FaceDetecetion/NotifiCamera.js";
import { NotifiEvent } from "../models/FaceDetecetion/NotifiEvent.js";
import e from "express";
const route = express.Router();

//get all notification
route.get("/", async (req, res, next) => {
  try {
    const data = await getAllNotification();
    const camera = "camera";
    const time = "time";
    const date = "date";

    if (data?.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const [camaras] = await NotifiCamera.findWarningCamera(data[i].id);
        data[i][camera] = camaras?.map(item => item.streamId);
      }
      for (let i = 0; i < data.length; i++) {
        const [times] = await NotifiTime.findWarningTime(data[i].id);
        data[i][time] = times;
      }
      for (let i = 0; i < data.length; i++) {
        const [dates] = await NotifiTime.findWarningDate(data[i].id);
        data[i][date] = dates?.map(item => item.day_of_week);
      }
    }

    res.status(200).json({
      message: "get notification successfully",
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
// get notification detail
route.get("/notificationDetail", async (req, res, next) => {
  const id = req.query.id;
  try {
    const [data] = await Notification.getDetail(id);
    const camera = "camera";
    const time = "time";
    const date = "date";
    if (data?.length > 0) {
      const [camaras] = await NotifiCamera.findWarningCamera(id);
      data[0][camera] = camaras?.map((item) => item.streamId);
      const [times] = await NotifiTime.getWarningTime(id);
      data[0][time] = times;
      const [dates] = await NotifiTime.findWarningDate(id);
      data[0][date] = dates;
    }

    res.status(200).json({
      message: "get notification detail successfully",
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

// create notification
route.post("/createNotification", async (req, res, next) => {
  let name = req.body.name;
  let gender = req.body.gender;
  let age = req.body.age;
  let mask = req.body.mask;
  let stranger = req.body.stranger;
  let cameras = req.body.cameras;
  let time = req.body.time;
  let status = req.body.status;
  try {
    const [findData] = await Notification.findName(req.body.name);
    if (findData.length >= 1) {
      return res
        .status(402)
        .json({ message: "This notification has already existed" });
    } else {
      const data = new Notification(name, gender, age, mask, stranger, status);
      data
        .createNew()
        .then(async () => {
          const [findId] = await Notification.findName(name);
          const notifiEvent = new NotifiCamera();
          if (cameras !== undefined) {
            for (let i = 0; i < cameras.length; i++) {
              notifiEvent.settingCamera(findId[0].id, cameras[i]);
            }
          }

          if (time !== undefined) {
            const notifiTime = new NotifiTime();
            for (let i = 0; i < time.length; i++) {
              notifiTime.createTime(
                findId[0].id,
                moment(time[i].start_time).format("HH:mm:ss"),
                moment(time[i].end_time).format("HH:mm:ss"),
                time[i].schedule.toString()
              );
            }
          }

          return res.status(200).json({
            message: "create notification successfully",
            statusCode: res.statusCode,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});
// update notification
route.put("/updateNotification", async (req, res, next) => {
  const id = req.query.id;
  let name = req.body.name;
  let gender = req.body.gender;
  let age = req.body.age;
  let mask = req.body.mask;
  let stranger = req.body.stranger;
  let cameras = req.body.cameras;
  let time = req.body.time;
  let status = req.body.status;
  try {
    const update = new Notification(name, gender, age, mask, stranger, status);
    update
      .updateNotifi(id)
      .then(async () => {
        if (cameras !== undefined) {
          const notifiEvent = new NotifiCamera();
          notifiEvent.deleteCamera(id).then(() => {
            for (let i = 0; i < cameras.length; i++) {
              notifiEvent.settingCamera(id, cameras[i]);
            }
          });
        }
        if (time !== undefined) {
          const notifiTime = new NotifiTime();
          notifiTime.deleteTime(id).then(() => {
            for (let i = 0; i < time.length; i++) {
              notifiTime.createTime(
                id,
                moment(time[i].start_time).format("HH:mm:ss"),
                moment(time[i].end_time).format("HH:mm:ss"),
                time[i].schedule.toString()
              );
            }
          });
        }
        return res.status(200).json({
          message: "update notification successfully",
          statusCode: res.statusCode,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//update status notification
route.put("/updateStatus", async (req, res, next) => {
  const id = req.query.id;
  const newStatus = req.body.status;
  try {
    const status = new Notification();
    status.status = newStatus;
    status
      .updateStatus(id)
      .then(() => {
        res.status(200).json({
          message: "Update status successfully",
          statusCode: res.statusCode,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//delete notification
route.delete("/deleteNotification", async (req, res, next) => {
  const id = req.query.id;
  try {
    const notifiTime = new NotifiTime();
    notifiTime
      .deleteTime(id)
      .then(() => {
        const notifiEvent = new NotifiCamera();
        notifiEvent.deleteCamera(id).then(() => {
          const notification = new Notification();
          notification.DeleteNotification(id);
          return res.status(200).json({
            message: "Delete notification successfully",
            statusCode: res.statusCode,
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

// create warning event
route.post("/createEvent", async (req, res, next) => {
  let notifiId = req.body.notifiId;
  let streamId = req.body.streamId;
  let age = req.body.age;
  let gender = req.body.gender;
  let createdAt = req.body.createdAt;
  try {
    const event = new NotifiEvent(notifiId, streamId, age, gender, createdAt);
    event
      .createEvent()
      .then(() => {
        res.status(200).json({
          message: "create warning event successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

// get all event
route.get("/getAllNotifiEvent", async (req, res, next) => {
  try {
    const [data] = await NotifiEvent.getAllNotifiEvent();
    res.status(200).json({
      message: "get all notification event succcessfully",
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

//get warning event detail
route.get('/getNotifiEventDetail',async (req, res, next)=>{
  const id = req.query.id
  try {
    const [data] = await NotifiEvent.findNotifiEvent(id);
    res.status(200).json({
      message: "get event detail succcessfully",
      content: data,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
})

//delete notification event
route.delete('/deleteNotifiEvent', async(req, res, next)=>{
  const id = req.query.id
  try {
    await NotifiEvent.deleteEvent(id)
    res.status(200).json({
      message: "get event detail succcessfully",
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
})

export default route;
