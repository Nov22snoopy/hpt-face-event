import express from "express";
import { Notification } from "../models/Notification.js";
import { getAllNotification } from "../controller/index.js";
import { NotifiEvent } from "../models/NotifiEvent.js";
import { NotifiTime } from "../models/NotifiTime.js";
import moment from 'moment'
const route = express.Router();

//get all notification
route.get("/", async (req, res, next) => {
  try {
    const result = []
    const [data] = await getAllNotification();
    if(data) result.push(data)
    const [cameras] = (await NotifiEvent.getWarningCamera())
    const [times] = await NotifiTime.getWarningTime();
    const camera = 'camera'
    const time = 'time'
    const day_of_week = "day_of_week"

    if(cameras) result[0][camera] = cameras.map((item)=>item.name)
    if(times) {
      result[0][time] = times.map((item)=>`${item.start_time} - ${item.end_time}`)
      result[0][day_of_week] = times.map((item)=>item.day_of_week)
    }

    res.status(200).json({
      message: "get notification successfully",
      content: result,
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
route.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [data] = await Notification.getDetail(id);
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
          const notifiEvent = new NotifiEvent();
          if (cameras !== undefined) {
            for (let i = 0; i < cameras.length; i++) {
              notifiEvent.createTime(findId[0].id, cameras[i]);
            }
          }

          if (time !== undefined) {
            const notifiTime = new NotifiTime();
            for (let i = 0; i < time.length; i++) {
              notifiTime.createTime(
                findId[0].id,
                moment(time[i].start_time).format('HH:mm:ss'),
                moment(time[i].end_time).format('HH:mm:ss'),
                time[i].schedule.toString()
              );
            }
          }

          return res.status(200).json({
            message: "create notification successfully",
            statusCode: res.statusCode
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

export default route;
