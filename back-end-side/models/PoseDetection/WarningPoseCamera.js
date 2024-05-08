import pool from "../../config/db.js";

export class WarningPoseCamera {
  constructor() {}
  async createPoseCamera(poseId, streamId) {
    let sql = `INSERT INTO videoanalytics.pose_warning_camera (poseId, streamId) VALUES (${poseId}, ${streamId})`;
    return pool.execute(sql);
  }
  async deleteCamera(poseId) {
    let sql =`DELETE FROM videoanalytics.pose_warning_camera WHERE poseId = ${poseId} and id > 0;`
    return pool.execute(sql);
  }
  static findPoseCamera(id) {
    let sql = `SELECT videoanalytics.pose_warning_camera.streamId
    FROM videoanalytics.pose_warning_camera 
    INNER JOIN videoanalytics.streams ON videoanalytics.pose_warning_camera.streamId = videoanalytics.streams.id 
    WHERE pose_warning_camera.poseId = ${id}; `;
    return pool.execute(sql)
  }
}
