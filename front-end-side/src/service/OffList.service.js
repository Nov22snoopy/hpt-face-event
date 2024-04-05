import http from "../constant/api";

export const offListService = {
  getOffList: () => http.get(`/faceDetection/offList`),
  getOffListAge: (payload) => http.post('/faceDetection/offListAge',payload),
  getOffListGender: (payload) => http.post('/faceDetection/offListGender', payload),
}