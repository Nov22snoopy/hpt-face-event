import http from "../constant/api";

export const faceDetectionService = {
  getAllFaceDetection: () => http.get(`/faceDetection`),
  getAllListByDate: (payload) => http.post('/faceDetection/allListByDate', payload),
  caculateTimekeeping: (payload) => http.post('/faceDetection/caculateTimekeeping', payload),
  getTimeDetail: (payload) => http.post('/faceDetection/timeDetail', payload),
  updateTimeOut: (payload) => http.post(`/faceDetection/updateCheckOut`, payload),
  getAttendanceList: (payload) => http.post (`/faceDetection/allListAttendance`, payload),
  getAllListByMail :(query, payload) => http.get(`/faceDetection/allListByMail?email=${query}&list_id=${payload}`),
  getListFace: () => http.get(`/faceDetection/listFace`),
  addList :(payload) => http.post(`/faceDetection/addList`, payload)
}