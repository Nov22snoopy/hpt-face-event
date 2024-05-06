import pool from "../../config/db.js";

export class Notification {
  constructor(
    _name,
    _gender,
    _age,
    _mask,
    _stranger,
    _status
  ) {
    (this.name = _name),
      (this.gender = _gender),
      (this.age = _age),
      (this.mask = _mask),
      (this.stranger = _stranger),
      (this.status = _status)
  }
  async createNew() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${h}:${m}:${s}`;
    let sql = `INSERT INTO videoanalytics.warning_setting (name,  gender, age, mask, stranger, created_at, status ) 
    VALUES ('${this.name}', '${this.gender}', '${this.age}' , '${this.mask}', '${this.stranger}' ,'${createdAt}', ${this.status});`;
    return pool.execute(sql);
  }

  async updateNotifi(id) {
    let sql = `UPDATE videoanalytics.warning_setting SET name = '${this.name}',  gender = '${this.gender}', age = '${this.age}', mask = '${this.mask}', stranger = '${this.stranger}', status = ${this.status}
              WHERE id = ${id}`
    return pool.execute(sql);
  }

  async updateStatus(id) {
    let sql = `UPDATE videoanalytics.warning_setting set status = ${this.status} WHERE id = ${id}`
    return pool.execute(sql)
  }

  async DeleteNotification(id) {
    let sql = `DELETE FROM videoanalytics.warning_setting WHERE id = ${id} `
    return pool.execute(sql)
  }

  static getDetail(id) {
    let sql = `SELECT * FROM videoanalytics.warning_setting WHERE videoanalytics.warning_setting.id = ${id};`;
    return pool.execute(sql)
  }
  static findName(name) {
    let sql = `SELECT id FROM videoanalytics.warning_setting WHERE videoanalytics.warning_setting.name = '${name}';`
    return pool.execute(sql)
  }
}
