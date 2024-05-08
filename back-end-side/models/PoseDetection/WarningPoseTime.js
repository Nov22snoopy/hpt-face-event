import pool from "../../config/db.js";

export class WarningPoseTime {
  constructor() {}
  async createPoseTime(poseId, start_time, end_time, day_of_week) {
    let sql = `INSERT INTO videoanalytics.pose_warning_time (poseId, start_time, end_time, day_of_week) VALUES (${poseId}, '${start_time}', '${end_time}', '${day_of_week}')`;
    return pool.execute(sql);
  }
  async deletePoseTime(poseId) {
    let sql = `DELETE FROM videoanalytics.pose_warning_time WHERE poseId = ${poseId} and id > 0;`
    return pool.execute(sql)
  }
  static getPoseTime(id) {
    let sql = `SELECT start_time, end_time, day_of_week FROM videoanalytics.pose_warning_time WHERE poseId = ${id}`;
    return pool.execute(sql);
  }
  static findPoseTime(id) {
    let sql = `SELECT start_time, end_time FROM videoanalytics.pose_warning_time WHERE poseId = ${id}`;
    return pool.execute(sql);
  }
  static findPoseDate(id) {
    let sql = `SELECT day_of_week FROM videoanalytics.pose_warning_time WHERE poseId = ${id}`;
    return pool.execute(sql);
  }
}
