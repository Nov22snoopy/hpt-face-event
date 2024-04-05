import pool from "../config/db.js";

export class User {
  constructor(_email, _password) {
    (this.email = _email), (this.password = _password);
  }

  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${h}:${m}:${s} `;
    let sql = `INSERT INTO videoanalytics.users (email,fullname ,password,last_login, ip_params, role_id, status, created_at, client_id, type) 
              VALUES ('${this.email}','Nguyen Quang Long' ,'${this.password}','${createdAt}', ' ', 2, 0 ,'${createdAt}', 0, 'basic')`;

    const newUser = await pool.execute(sql);
    return newUser;
  }
  async update(email) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${h}:${m}:${s} `;
    let sql = `UPDATE videoanalytics.users SET last_login = '${createdAt}', status = 1 WHERE email = '${email}' `;
    const newUpdate = await pool.execute(sql);
    return newUpdate;
  }
  async logOut(email) {
    let sql = `UPDATE videoanalytics.users SET  status = 0 WHERE email = '${email}' `;
    const newUpdate = await pool.execute(sql);
    return newUpdate;
  }
  static findId(id) {
    let sql = `SELECT * FROM videoanalytics.users WHERE id = '${id}'`;
    return pool.execute(sql);
  }
  static findEmail(email) {
    let sql = `SELECT * FROM videoanalytics.users WHERE email = '${email}'`;
    return pool.execute(sql);
  }
}
