import http from "../constant/api";

export const poseDetectionService = {
  getPoseDetection: (query) =>
    http.get(
      `/poseDetection?poseType=${query.poseType}&streamId=${query.streamId}&timeId=${query.timeId}`
    ),
  getPoseDetectionDetail: (query) =>
    http.get(`/poseDetection/getPoseDetectionDetail?id=${query}`),
  createPoseDetectionSetting: (payload) =>
    http.post(`/poseDetection/createPoseDetectionSetting`, payload),
  updatePoseDetectionSetting: (query, payload) =>
    http.put(`/poseDetection/updatePoseDetectionSetting?id=${query}`, payload),
  updatePoseDetectionStatus: (query, payload) =>
    http.put(`/poseDetection/updatePoseDetectionStatus?id=${query}`, payload),
  deletePoseDetectionSetting: (query) =>
    http.delete(`/poseDetection/deletePoseDetectionSetting?id=${query}`),
  createPoseDetectionEvent: (payload) =>
    http.post(`/poseDetection/createPoseDetectionEvent`, payload),
  getAllPoseDetectionEvent: (query) =>
    http.get(
      `/poseDetection/getAllPoseDetectionEvent?poseType=${query.poseType}&streamId=${query.streamId}&timeId=${query.timeId}`
    ),
  getPoseDetectionEventDetail: (query) =>
    http.get(`/poseDetection/getPoseDetectionEventDetail?id=${query}`),
  deletePoseDetectionEvent:(query) => 
    http.delete(`/poseDetection/deletePoseDetectionEvent?id=${query}`),
  getCameraPoseEvent: (query) => 
    http.get(`/poseDetection/getCameraPoseEvent?date=${query}`),
  getPoseWarningStats:(query) => 
    http.get(`/poseDetection/getPoseWarningStats?date=${query}`)
};
