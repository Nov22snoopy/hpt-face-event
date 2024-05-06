import pool from "../../config/db.js";

export class NotifiEvent {
  constructor(_notifiId, _streamId,_age, _gender, _createdAt) {
    (this.notifiId = _notifiId),
      (this.streamId = _streamId),
      (this.age = _age),
      (this.gender = _gender),
      (this.createdAt = _createdAt);
  }
  async createEvent() {
    let sql = `INSERT INTO videoanalytics.warning_event (notifiId, streamId, age, gender, created_at) VALUES (${this.notifiId}, ${this.streamId}, '${this.age}', ${this.gender}, '${this.createdAt}')`;
    return pool.execute(sql);
  }
  static deleteEvent(id) {
    let sql = `DELETE FROM videoanalytics.warning_event WHERE id = ${id} and id > 0;`;
    return pool.execute(sql);
  }
  static getAllNotifiEvent() {
    let sql = `SELECT videoanalytics.warning_event.id , videoanalytics.warning_setting.name, videoanalytics.streams.name as camera, videoanalytics.warning_event.created_at
    FROM videoanalytics.warning_event 
    INNER JOIN videoanalytics.warning_setting ON videoanalytics.warning_event.notifiId = videoanalytics.warning_setting.id
    INNER JOIN videoanalytics.streams ON videoanalytics.warning_event.streamId = videoanalytics.streams.id;`;
    return pool.execute(sql);
  }
  static findNotifiEvent(id) {
    let sql = `SELECT videoanalytics.warning_event.id , videoanalytics.warning_setting.name, videoanalytics.warning_event.age, videoanalytics.warning_event.gender , videoanalytics.streams.id as camera, videoanalytics.warning_event.created_at
    FROM videoanalytics.warning_event 
    INNER JOIN videoanalytics.warning_setting ON videoanalytics.warning_event.notifiId = videoanalytics.warning_setting.id
    INNER JOIN videoanalytics.streams ON videoanalytics.warning_event.streamId = videoanalytics.streams.id
    WHERE videoanalytics.warning_event.id = ${id};
    `;
    return pool.execute(sql);
  }
}
