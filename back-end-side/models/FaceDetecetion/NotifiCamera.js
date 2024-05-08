import pool from "../../config/db.js";

export class NotifiCamera {
  constructor() {}
  async settingCamera(notifiId, streamId) {
    let sql = `INSERT INTO videoanalytics.warning_camera (notifiId, streamId) VALUES (${notifiId}, ${streamId})`;
    return pool.execute(sql);
  }
  async deleteCamera(notifiId) {
    let sql =`DELETE FROM videoanalytics.warning_camera WHERE notifiId = ${notifiId} and id > 0;`
    return pool.execute(sql);
  }
  static getWarningCamera() {
    let sql = `SELECT streamId FROM videoanalytics.warning_camera;
    `;
    return pool.execute(sql);
  }
  static findWarningCamera(id) {
    let sql = `SELECT streamId, videoanalytics.streams.name FROM videoanalytics.warning_camera INNER JOIN videoanalytics.streams ON videoanalytics.warning_camera.streamId = videoanalytics.streams.id
    WHERE notifiId = ${id}`;
    return pool.execute(sql);
  }
}
