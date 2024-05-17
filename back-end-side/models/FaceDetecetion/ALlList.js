import pool from "../../config/db.js";

export class AllList {
  constructor(
    _list_id,
    _list_item_id,
    _stream_id,
    _va_id,
    _gender,
    _created_at
  ) {
    this.list_id = _list_id;
    (this.list_item_id = _list_item_id),
      (this.stream_id = _stream_id),
      (this.va_id = _va_id),
      (this.gender = _gender),
      (this.created_at = _created_at);
  }
  async updateCheckOut() {
    let sql = `INSERT INTO videoanalytics.face_detections (list_id, list_item_id, stream_id, va_id ,gender, created_at) VALUES (${this.list_id}, ${this.list_item_id}, ${this.stream_id}, ${this.va_id}, ${this.gender}, '${this.created_at}');`;
    return pool.execute(sql);
  }
  static getCameraAllListByDate(date) {
    let sql = `SELECT count(stream_id) as quantity, name as camera FROM videoanalytics.face_detections 
    INNER JOIN videoanalytics.streams ON videoanalytics.face_detections.stream_id = videoanalytics.streams.id
    WHERE videoanalytics.face_detections.created_at Like '%${date}%' GROUP BY stream_id ORDER BY stream_id ASC;`;
    return pool.execute(sql);
  }
  static getAllOutList(date) {
    let sql = `SELECT SUM(quantity) as outList FROM (
      SELECT count(id) as quantity FROM videoanalytics.face_detections 
      WHERE videoanalytics.face_detections.created_at like'%${date}%' AND list_id is null
      GROUP BY stream_id ORDER BY stream_id ASC
      ) AS ouList `;
    return pool.execute(sql);
  }
  static getAllInList(date) {
    let sql = `SELECT SUM(quantity)as inList from (SELECT count(id) as quantity FROM videoanalytics.face_detections 
    WHERE videoanalytics.face_detections.created_at like'%${date}%' AND list_id is not null
    GROUP BY stream_id ORDER BY stream_id ASC) as inList;`;
    return pool.execute(sql)
  }
  static getAllListStats(date) {
    let sql = `SELECT SUM(quantity)as quantity from (SELECT count(id) as quantity FROM videoanalytics.face_detections 
    WHERE videoanalytics.face_detections.created_at like'%${date}%' GROUP BY stream_id ORDER BY stream_id ASC) as allList;`;
    return pool.execute(sql)
  }
}
