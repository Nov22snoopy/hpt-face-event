import pool from "../../config/db.js";

export class DatePick {
  constructor(_date) {
    this.date = _date
  }
  async pickDate() {
    let sql = `SELECT count(videoanalytics.face_detections.age) AS quantity, videoanalytics.face_detections.age 
    FROM videoanalytics.face_detections WHERE date(videoanalytics.face_detections.created_at) = "${this.date}" AND videoanalytics.face_detections.list_item_id IS  null 
    GROUP BY videoanalytics.face_detections.age ORDER BY videoanalytics.face_detections.age;`
    return pool.execute(sql)
  }
}