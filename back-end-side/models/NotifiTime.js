import pool from "../config/db.js";

export class NotifiTime {
  async createTime(notifiId,start_time, end_time, day_of_week) {
    let sql = `INSERT INTO videoanalytics.warning_time (notifiId ,start_time, end_time, day_of_week) VALUES (${notifiId},'${start_time}', '${end_time}', '${day_of_week}')`;
    return pool.execute(sql)
  }
  static getWarningTime() {
    let sql = `SELECT start_time, end_time, day_of_week FROM videoanalytics.warning_time;`;
    return pool.execute(sql)
  }
}