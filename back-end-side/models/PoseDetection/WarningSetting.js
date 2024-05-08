import pool from "../../config/db.js";

export class WarningPoseSetting {
  constructor(_poseType, _status) {
    (this.poseType = _poseType), (this.status = _status);
  }
  async createSettting() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${h}:${m}:${s} `;
    let sql = `INSERT INTO videoanalytics.pose_warning_setting (poseType, created_at, status) VALUES ('${this.poseType}', '${createdAt}', ${this.status})`;
    return pool.execute(sql);
  }
  async updatePoseWarning(id) {
    let sql = `UPDATE videoanalytics.pose_warning_setting SET poseType = '${this.poseType}', status = ${this.status} WHERE id = ${id}`
    return pool.execute(sql);
  }

  async updatePoseStatus(id) {
    let sql = `UPDATE videoanalytics.pose_warning_setting set status = ${this.status} WHERE id = ${id}`
    return pool.execute(sql)
  }
  async deletePoseSetting(id) {
    let sql = `DELETE FROM videoanalytics.pose_warning_setting WHERE id = ${id} `
    return pool.execute(sql)
  }
  static getPoseSetting(name, streamId, timeId) {
    let sql = `SELECT pose_warning_setting.id, pose_warning_setting.poseType,pose_warning_setting.created_at, pose_warning_setting.status
    FROM videoanalytics.pose_warning_setting
    inner join pose_warning_camera ON pose_warning_setting.id = pose_warning_camera.poseId
    inner join pose_warning_time ON pose_warning_setting.id = pose_warning_time.poseId
    WHERE poseType like '%${name}%' ${
      streamId?.length > 0 ? `AND streamId in (${streamId})` : ""
    } and day_of_week like '%${timeId}%' ORDER BY id ASC
    ;`;
    return pool.execute(sql);
  }

  static findSetting(name) {
    let sql = `SELECT * FROM videoanalytics.pose_warning_setting WHERE videoanalytics.pose_warning_setting.poseType = '${name}' `;
    return pool.execute(sql);
  }
  static getPoseDetail(id) {
    let sql = `SELECT * FROM videoanalytics.pose_warning_setting WHERE videoanalytics.pose_warning_setting.id = ${id};`;
    return pool.execute(sql)
  }
}
