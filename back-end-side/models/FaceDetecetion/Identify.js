import pool from "../../config/db.js";

export class Indentify {
  constructor(_stream_id, _va_id, _age,_gender, _mask){
    this.stream_id = _stream_id,
    this.va_id = _va_id,
    this.age = _age,
    this.gender = _gender,
    this.mask = _mask
  }
  async addList () {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${h}:${m}:${s} `;
    let sql = `INSERT INTO videoanalytics.face_detections (stream_id, va_id, age, gender, mask ,created_at) VALUES (${this.stream_id}, ${this.va_id}, '${this.age}', ${this.gender}, ${this.mask}, '${createdAt}');`
    return pool.execute(sql)
  }
}