import http from "../constant/api";

export const notificationService = {
  getAllNotification: () => http.get('/notification'),
  getNotificationDetail: (query) => http.get(`/notification/${query}`),
  createNewNotification: (payload) => http.post(`/notification/createNotification`, payload),
  updateNotification: (payload) => http.put('/notification/notificationUpdate', payload)

}