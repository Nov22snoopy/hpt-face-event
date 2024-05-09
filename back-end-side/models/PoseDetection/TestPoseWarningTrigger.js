import pool from "../../config/db.js";

export class TestPoseTrigger {
  constructor(_streamId, _ruleType) {
    (this.streamId = _streamId), (this.ruleType = _ruleType);
  }
  async createTestTrigger() {
    let sql = ` INSERT INTO videoanalytics.pose_estimation_notifications (status, accepted_by, stream_id, va_id, frame_image, thumbnail_image, rule_type, created_at) 
    VALUES (0, 1, ${this.streamId}, 26, 'hhh', 'ggg', '${this.ruleType}', NOW())`;
    return pool.execute(sql)
  }
}
