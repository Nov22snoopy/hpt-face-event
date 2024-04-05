import http from "../constant/api";

export const UserService = {
  getAllUser: () => http.get(`/user`),
  login: (payload) => http.post(`/user/login`, payload),
  getUser: (query) => http.get(`/user/${query}`),
  logout: (payload) => http.post(`/user/logout`, payload),
};
