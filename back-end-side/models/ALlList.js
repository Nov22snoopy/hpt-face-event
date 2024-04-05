import pool from "../config/db.js"

export class AllList {
  constructor(_list_id, _list_item_id, _stream_id,  _va_id, _gender, _created_at)  {
    this.list_id = _list_id
    this.list_item_id = _list_item_id,
    this.stream_id = _stream_id,
    this.va_id = _va_id,
    this.gender = _gender,
    this.created_at = _created_at
  }
  async updateCheckOut() {
    let sql = `INSERT INTO videoanalytics.face_detections (list_id, list_item_id, stream_id, va_id ,gender, created_at) VALUES (${this.list_id}, ${this.list_item_id}, ${this.stream_id}, ${this.va_id}, ${this.gender}, '${this.created_at}');`
    return pool.execute(sql)
  }
}
