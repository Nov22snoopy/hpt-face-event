import pool from "../config/db.js";

export class NotifiEvent {
  constructor() {

  }
  async createTime (notifiId,streamId) {
    let sql = `INSERT INTO videoanalytics.warning_camera (notifiId, streamId) VALUES (${notifiId}, ${streamId})`;
    return pool.execute(sql)
  }
  static getWarningCamera() {
    let sql = `SELECT videoanalytics.streams.name FROM videoanalytics.warning_camera INNER JOIN videoanalytics.streams ON videoanalytics.warning_camera.id = videoanalytics.streams.id;`;
    return pool.execute(sql)
  }
}