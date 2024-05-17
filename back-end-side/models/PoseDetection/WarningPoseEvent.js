import pool from "../../config/db.js";

export class WarningPoseEvent {
  constructor(_poseId, _streamId, _createdAt) {
    (this.poseId = _poseId),
      (this.streamId = _streamId),
      (this.createdAt = _createdAt);
  }
  async createPoseEvent() {
    let sql = `INSERT INTO videoanalytics.pose_warning_event (poseId, streamId, created_at) VALUES(${this.poseId}, ${this.streamId}, '${this.createdAt}');`;
    return pool.execute(sql);
  }
  async deletePoseEvent(id) {
    let sql = `DELETE FROM videoanalytics.pose_warning_event WHERE id = ${id};`;
    return pool.execute(sql);
  }
  static getAllPoseEvent(poseType, streamId, date) {
    let sql = `SELECT pose_warning_event.id, pose_warning_setting.poseType, streams.name as camera, pose_warning_event.created_at
    FROM videoanalytics.pose_warning_event 
    INNER JOIN videoanalytics.pose_warning_setting ON videoanalytics.pose_warning_event.poseId = videoanalytics.pose_warning_setting.id
    INNER JOIN videoanalytics.streams ON videoanalytics.pose_warning_event.streamId = videoanalytics.streams.id
    WHERE pose_warning_setting.poseType like '%${poseType}%' ${
      streamId?.length > 0
        ? `AND pose_warning_event.streamId in (${streamId})`
        : ``
    } ${
      date?.length > 0
        ? `AND dayofweek(pose_warning_event.created_at) in (${date})`
        : ""
    }
    ;`;
    return pool.execute(sql);
  }
  static getPoseEventDetail(id) {
    let sql = `SELECT pose_warning_event.id, pose_warning_setting.poseType, pose_warning_event.streamId as camera, pose_warning_event.created_at
    FROM videoanalytics.pose_warning_event 
    INNER JOIN videoanalytics.pose_warning_setting ON videoanalytics.pose_warning_event.poseId = videoanalytics.pose_warning_setting.id
    INNER JOIN videoanalytics.streams ON videoanalytics.pose_warning_event.streamId = videoanalytics.streams.id
    WHERE pose_warning_event.id = ${id};`;
    return pool.execute(sql);
  }
  static getCameraPoseEventByDate(date) {
    let sql = `SELECT count(streamId) as quantity, name as camera FROM videoanalytics.pose_warning_event
    INNER JOIN videoanalytics.streams ON pose_warning_event.streamId = streams.id
    WHERE pose_warning_event.created_at like "%${date}%"
    GROUP BY streamId;`;
    return pool.execute(sql);
  }
  static getPoseWarningStats(date) {
    let sql = `SELECT count(poseId) as quantity, poseType as warning FROM videoanalytics.pose_warning_event
    INNER JOIN videoanalytics.pose_warning_setting ON pose_warning_event.poseId = pose_warning_setting.id
    WHERE pose_warning_event.created_at like "%${date}%"
    GROUP BY poseId;`;
    return pool.execute(sql);
  }
  static getTolalPoseWarning(date) {
    let sql = `SELECT sum(quantity) as quantity FROM (
      SELECT count(poseId) as quantity FROM videoanalytics.pose_warning_event
      WHERE pose_warning_event.created_at like "%${date}%"
      GROUP BY poseId
      )as pose_warning;`;
    return pool.execute(sql);
  }
}
