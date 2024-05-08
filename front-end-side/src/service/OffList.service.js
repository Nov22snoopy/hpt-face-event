import http from "../constant/api";

export const offListService = {
  getOffList: (query) => http.get(`/faceDetection/offList?date=${query.date}&streamId=${query.streamId}`),
  getOffListAge: (payload) => http.post('/faceDetection/offListAge',payload),
  getOffListGender: (payload) => http.post('/faceDetection/offListGender', payload),
}