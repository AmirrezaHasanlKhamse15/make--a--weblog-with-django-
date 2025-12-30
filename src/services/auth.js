import api from "./axios";

// درخواست ثبتنام
export const register = async (name, username, password) => {
  const response = await api.post("/signup", { name, username, password });
  return response.data;
};

// درخواست لاگین
export const login = async (username, password) => {
  const response = await api.post("/login", { username, password });
  return response.data;
};
