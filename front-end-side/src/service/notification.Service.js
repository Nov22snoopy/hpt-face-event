import http from "../constant/api";

export const notificationService = {
  getAllNotification: (query) => http.get(`/notification?name=${query.name}&streamId=${query.streamId}&timeId=${query.timeId}`),
  getNotificationDetail: (query) => http.get(`/notification/notificationDetail?id=${query}`),
  createNewNotification: (payload) => http.post(`/notification/createNotification`, payload),
  updateNotification: (query,payload) => http.put(`/notification/updateNotification?id=${query}`, payload),
  deleteNotification: (query) => http.delete(`/notification/deleteNotification?id=${query}`),
  updateStatus: (query, payload) => http.put(`/notification/updateStatus?id=${query}`,payload),
  createEvent: (payload) => http.post('/notification/createEvent', payload),
  getAllNotifiEvent: (query) => http.get(`/notification/getAllNotifiEvent?name=${query.name}&streamId=${query.streamId}&timeId=${query.timeId}`),
  getNotifiEventDetail: (query) => http.get(`/notification/getNotifiEventDetail?id=${query}`),
  deleteNotifiEvent: (query) => http.delete(`/notification/deleteNotifiEvent?id=${query}`)
}