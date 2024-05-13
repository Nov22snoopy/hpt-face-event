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
  static getAllNotifiEvent(name, streamId, timeId) {
    let sql = `SELECT videoanalytics.warning_event.id , videoanalytics.warning_setting.name, videoanalytics.streams.name as camera, videoanalytics.warning_event.created_at
    FROM videoanalytics.warning_event 
    INNER JOIN videoanalytics.warning_setting ON videoanalytics.warning_event.notifiId = videoanalytics.warning_setting.id
    INNER JOIN videoanalytics.streams ON videoanalytics.warning_event.streamId = videoanalytics.streams.id
    WHERE warning_setting.name like '%${name}%' ${streamId?.length > 0? `AND streamId in (${streamId})` :''} ${timeId?.length > 0? `AND dayofweek(warning_event.created_at) in (${timeId})` :''};`;
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
  static getCameraFaceEventByDate(date) {
    let sql =  `SELECT count(streamId) as quantity, name as camera FROM videoanalytics.warning_event
    INNER JOIN videoanalytics.streams ON warning_event.streamId = streams.id
    WHERE warning_event.created_at like "%${date}%"
    GROUP BY streamId;`;
    return pool.execute(sql)
  }
  static getFaceWarningStats(date) {
    let sql = `SELECT count(notifiId) as quantity, name as warning FROM videoanalytics.warning_event
    INNER JOIN videoanalytics.warning_setting ON warning_event.notifiId = warning_setting.id
    WHERE warning_event.created_at like "%${date}%"
    GROUP BY notifiId;`;
    return pool.execute(sql)
  }
}
