import api from "./axios";

// دریافت لیست کاربران
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// حذف کاربر
export const deleteUser = async (userId) => {
  await api.delete(`/users/${userId}`);
};

// change role
export const changeUserRole = async (userId, newRole) => {
  await api.put(`/users/${userId}/role`, { role: newRole });
};
