import express from "express";
import { WarningPoseSetting } from "../models/PoseDetection/WarningSetting.js";
import { WarningPoseCamera } from "../models/PoseDetection/WarningPoseCamera.js";
import { WarningPoseTime } from "../models/PoseDetection/WarningPoseTime.js";
import moment from "moment";
import { TestPoseTrigger } from "../models/PoseDetection/TestPoseWarningTrigger.js";
import { io } from "../socket/socket.js";
import { WarningPoseEvent } from "../models/PoseDetection/WarningPoseEvent.js";

const route = express.Router();

//get all pose warning setting
route.get("/", async (req, res, next) => {
  const poseType = req.query.poseType;
  const streamId = req.query.streamId;
  const timeId = req.query.timeId;
  try {
    const [data] = await WarningPoseSetting.getPoseSetting(
      poseType,
      streamId,
      timeId
    );
    const result = [];
    const camera = "camera";
    const time = "time";
    const date = "date";
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.id !== data[i + 1]?.id) {
        result.push(data[i]);
      }
    }

    if (result?.length > 0) {
      for (let i = 0; i < result.length; i++) {
        const [cameras] = await WarningPoseCamera.findPoseCamera(result[i].id);
        result[i][camera] = cameras?.map((item) => item.streamId);
      }
      for (let i = 0; i < result.length; i++) {
        const [times] = await WarningPoseTime.findPoseTime(result[i].id);
        result[i][time] = times;
      }
      for (let i = 0; i < result.length; i++) {
        const [dates] = await WarningPoseTime.findPoseDate(result[i].id);
        result[i][date] = dates?.map((item) => item.day_of_week);
      }
    }
    res.status(200).json({
      message: "get pose warning successfully",
      content: result,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//get pose warning detail
route.get("/getPoseDetectionDetail", async (req, res, next) => {
  const id = req.query.id;
  try {
    const [data] = await WarningPoseSetting.getPoseDetail(id);
    const camera = "camera";
    const time = "time";
    const date = "date";
    if (data?.length > 0) {
      const [camaras] = await WarningPoseCamera.findPoseCamera(id);
      data[0][camera] = camaras?.map((item) => item.streamId);
      const [times] = await WarningPoseTime.getPoseTime(id);
      data[0][time] = times;
    }
    res.status(200).json({
      message: "get pose warning detail successfully",
      content: data,
      statusCode: res.statusCode,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//create new pose warning setting
route.post("/createPoseDetectionSetting", async (req, res, next) => {
  const poseType = req.body.poseType;
  const camera = req.body.camera;
  const time = req.body.time;
  const status = req.body.status;
  try {
    const [checkSetting] = await WarningPoseSetting.findSetting(poseType);
    if (checkSetting?.length >= 1) {
      console.log(checkSetting);
      return res.status(402).json({
        message: "this pose warning has already existed",
      });
    } else {
      const poseSetting = new WarningPoseSetting(poseType, status);
      poseSetting
        .createSettting()
        .then(async () => {
          const [findPoseSetting] = await WarningPoseSetting.findSetting(
            poseType
          );
          const poseCamera = new WarningPoseCamera();
          if (camera) {
            console.log("object");
            for (let i = 0; i < camera?.length; i++) {
              poseCamera.createPoseCamera(findPoseSetting[0].id, camera[i]);
            }
          }
          const poseTime = new WarningPoseTime();
          if (time) {
            time?.forEach((element) => {
              poseTime.createPoseTime(
                findPoseSetting[0].id,
                moment(element?.start_time).format("HH:mm:ss"),
                moment(element?.end_time).format("HH:mm:ss"),
                element?.schedule.sort().toString()
              );
            });
          }
          return res.status(200).json({
            message: "Create pose warning setting successfully",
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

//update pose warning status
route.put("/updatePoseDetectionStatus", async (req, res, next) => {
  const id = req.query.id;
  const status = req.body.status;
  try {
    const data = new WarningPoseSetting();
    data.status = status;
    data
      .updatePoseStatus(id)
      .then(() => {
        res.status(200).json({
          message: "update pose warning status successfully",
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

//update pose warning
route.put("/updatePoseDetectionSetting", async (req, res, next) => {
  const id = req.query.id;
  const poseType = req.body.poseType;
  const camera = req.body.camera;
  const time = req.body.time;
  const status = req.body.status;
  try {
    const data = new WarningPoseSetting(poseType, status);
    data
      .updatePoseWarning(id)
      .then(async () => {
        const poseCamera = new WarningPoseCamera();
        if (camera) {
          poseCamera.deleteCamera(id).then(() => {
            for (let i = 0; i < camera?.length; i++) {
              poseCamera.createPoseCamera(id, camera[i]);
            }
          });
        }
        const poseTime = new WarningPoseTime();
        if (time) {
          poseTime.deletePoseTime(id).then(() => {
            time?.forEach((element) => {
              poseTime.createPoseTime(
                id,
                moment(element?.start_time).format("HH:mm:ss"),
                moment(element?.end_time).format("HH:mm:ss"),
                element?.schedule.sort().toString()
              );
            });
          });
        }
        return res.status(200).json({
          message: "Update pose warning setting successfully",
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

//delet pose warning
route.delete("/deletePoseDetectionSetting", async (req, res, next) => {
  const id = req.query.id;
  try {
    const poseSetting = new WarningPoseSetting();
    poseSetting
      .deletePoseSetting(id)
      .then(() => {
        const poseCamera = new WarningPoseCamera();
        poseCamera.deleteCamera(id);
        const poseTime = new WarningPoseTime();
        poseTime.deletePoseTime(id);
        return res.status(200).json({
          message: "Delete pose warning setting successfully",
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

//text trigger
route.post("/testTrigger", async (req, res, next) => {
  const streamId = req.body.streamId;
  const ruleType = req.body.ruleType;
  try {
    const test = new TestPoseTrigger(streamId, ruleType);
    test
      .createTestTrigger()
      .then(async () => {
        const [poseAlert] = await WarningPoseSetting.getPoseSetting();
        const camera = "camera";
        const date = "date";
        const startTime = "startTime";
        const endTime = "endTime";
        if (poseAlert?.length > 0) {
          for (let i = 0; i < poseAlert.length; i++) {
            const [cameras] = await WarningPoseCamera.findPoseCamera(
              poseAlert[i].id
            );
            poseAlert[i][camera] = cameras?.map((item) => item.streamId);
          }
          for (let i = 0; i < poseAlert.length; i++) {
            const [times] = await WarningPoseTime.findPoseTime(poseAlert[i].id);
            poseAlert[i][startTime] = times?.map((item) => item.start_time);
            poseAlert[i][endTime] = times?.map((item) => item.end_time);
          }

          for (let i = 0; i < poseAlert.length; i++) {
            const [dates] = await WarningPoseTime.findPoseDate(poseAlert[i].id);
            poseAlert[i][date] = dates?.map((item) => item.day_of_week);
          }
        }
        poseAlert?.forEach((item) => {
          let check = true;
          //check status
          const checkStatus = item.status.toString("hex");
          if (checkStatus === "00") {
            check = false;
            return;
          } else {
            check = true;
          }
          //check camera
          const checkCamera = item.camera.find(
            (element) => element === test.streamId
          );
          if (checkCamera === undefined) {
            check = false;
            return;
          } else {
            check = true;
          }
          console.log(item.poseType);
          //check rule
          const checkRule = item.poseType.match(test.ruleType);
          if (!checkRule) {
            check = false;
            return;
          } else {
            check = true;
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
            check = false;
            return;
          } else if (hour >= checkStartTime && hour <= checkEndTime) {
            check = true;
          }
          // check date
          const date = moment().day();
          const checkDate = item.date[0]
            .split(",")
            .find((day) => Number(day) === date);
          if (checkDate === undefined) {
            check = false;
            console.log(check);
            return;
          } else {
            check = true;
          }
          console.log(check);
          if (check) {
            console.log(item.id);
            io.emit("warning", {
              type: "pose alert",
              check: check,
              object: null,
              notification: {
                notifiId: item.id,
                notifiName: item.poseType,
                notifiStream: test.streamId,
                notifiTime: createAt,
              },
            });
          }
        });
        return res.status(200).json({
          message: "create new test pose alert trigger",
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

//create pose alert event
route.post(`/createPoseDetectionEvent`, async (req, res, next) => {
  const poseId = req.body.poseId;
  const streamId = req.body.streamId;
  const createAt = req.body.createdAt;
  try {
    const data = new WarningPoseEvent(poseId, streamId, createAt);
    data
      .createPoseEvent()
      .then(() => {
        res.status(200).json({
          message: "creaete new pose alert event successfully",
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

// get all pose alert event
route.get(`/getAllPoseDetectionEvent`, async (req, res, next) => {
  const poseType = req.query.poseType;
  const streamId = req.query.streamId;
  const timeId = req.query.timeId;
  try {
    const [data] = await WarningPoseEvent.getAllPoseEvent(
      poseType,
      streamId,
      timeId
    );
    res.status(200).json({
      message: "get all pose alert event successfully",
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

//get pose alert event detail
route.get(`/getPoseDetectionEventDetail`, async (req, res, next) => {
  const id = req.query.id;
  try {
    const [data] = await WarningPoseEvent.getPoseEventDetail(id);
    res.status(200).json({
      message: "get pose alert event successfully",
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

//detelet pose alert event
route.delete(`/deletePoseDetectionEvent`, async (req, res, next) => {
  const id = req.query.id;
  try {
    const deleteData = new WarningPoseEvent();
    deleteData
      .deletePoseEvent(id)
      .then(() => {
        res.status(200).json({
          message: "Delete pose alert event successfully",
          statusCode: res.statusCode,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
        });
      });
  } catch (error) {}
});

//get all camera pose event
route.get("/getCameraPoseEvent", async (req, res, next) => {
  const date = req.query.date;
  try {
    const [data] = await WarningPoseEvent.getCameraPoseEventByDate(date);
    res.status(200).json({
      message: "get camera pose event successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
});

//get pose warning stats
route.get('/getPoseWarningStats', async(req, res, next)=>{
  const date = req.query.date
  try {
    const [data] = await WarningPoseEvent.getPoseWarningStats(date)
    res.status(200).json({
      message: "get  pose warning stats successfully",
      content: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    next(error);
  }
})

export default route;
