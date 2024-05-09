import http from "../constant/api";

export const poseDetectionService = {
  getPoseDetection: (query) => http.get(`/poseDetection?poseType=${query.poseType}&streamId=${query.streamId}&timeId=${query.timeId}`),
  getPoseDetectionDetail: (query) => http.get(`/poseDetection/getPoseDetectionDetail?id=${query}`),
  createPoseDetectionSetting: (payload) => http.post(`/poseDetection/createPoseDetectionSetting`,payload),
  updatePoseDetectionSetting: (query, payload) => http.put(`/poseDetection/updatePoseDetectionSetting?id=${query}`,payload),
  updatePoseDetectionStatus: (query,payload) => http.put(`/poseDetection/updatePoseDetectionStatus?id=${query}`,payload),
  deletePoseDetectionSetting: (query) =>http.delete(`/poseDetection/deletePoseDetectionSetting?id=${query}`)
}