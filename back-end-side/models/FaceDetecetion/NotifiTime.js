import pool from "../../config/db.js";

export class NotifiTime {
  async createTime(notifiId,start_time, end_time, day_of_week) {
    let sql = `INSERT INTO videoanalytics.warning_time (notifiId ,start_time, end_time, day_of_week) VALUES (${notifiId},'${start_time}', '${end_time}', '${day_of_week}')`;
    return pool.execute(sql)
  }
  async deleteTime(notifiId) {
    let sql = `DELETE FROM videoanalytics.warning_time WHERE notifiId = ${notifiId} and id > 0;`
    return pool.execute(sql)
  }
  static getWarningTime(id) {
    let sql = `SELECT start_time, end_time, day_of_week FROM videoanalytics.warning_time WHERE notifiId = ${id};;`;
    return pool.execute(sql)
  }
  static findWarningTime(id) {
    let sql = `SELECT start_time, end_time FROM videoanalytics.warning_time WHERE notifiId = ${id};`
    return pool.execute(sql)
  }
  static findWarningDate(id) {
    let sql =`SELECT day_of_week FROM videoanalytics.warning_time WHERE notifiId = ${id};`
    return pool.execute(sql)
  }
}