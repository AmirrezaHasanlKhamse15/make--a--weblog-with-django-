// src/services/axios.js
import axios from 'axios';

// آدرس فرضی API که باید به آدرس واقعی جایگزین شود
const API_URL = 'https://api.example.com';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// اضافه کردن توکن JWT به تمامی درخواست‌ها
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token'); // توکن از localStorage دریافت می‌شود
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
