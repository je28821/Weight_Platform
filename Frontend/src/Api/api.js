import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8080/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export const register = async (data) => {
  const response = await api.post(`/api/auth/register`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post(`/api/auth/login`, data);
  return response.data;
};

export const loginGoogle = async (data) => {
  const response = await api.post(`/api/auth/google`, data);
  return response.data;
};

export const logout = async () => {
  const response = await api.delete(`/api/auth/logout`);
  return response.data;
};

export const homedata = async (params) => {
  console.log(params);
  const response = await api.get(`/api/products`, { params });
  return response.data;
};

export const getProduct = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

export const getCartData = async () => {
  const response = await api.get(`/api/cart`);
  return response.data;
};

export const addtoCart = async (id) => {
  const response = await api.post(`/api/cart/add/${id}`);
  return response.data;
};

export const countDCart = async (id) => {
  const response = await api.patch(`/api/cart/reduce/${id}`);
  return response.data;
};

export const countICart = async (id) => {
  const response = await api.patch(`/api/cart/increase/${id}`);
  return response.data;
};

export const cartRemove = async (id) => {
  const response = await api.delete(`/api/cart/remove/${id}`);
  return response.data;
};

export const clearCartApi = async () => {
  const response = await api.delete(`/api/cart`);
  return response.data;
};

export const addAppointment = async (data) => {
  const response = await api.post(`/api/appointment`, data);
  return response.data;
};

export const getappontments = async () => {
  const response = await api.get(`/api/appointment`);
  return response.data;
};

export const adminappontments = async () => {
  const response = await api.get(`/api/appointment/admin`);
  return response.data;
};

export const handleConfirmss = async (id) => {
  const response = await api.post(`/api/appointment/confirm`, { id });
  return response.data;
};

export const handleIgnors = async (id) => {
  const response = await api.post(`/api/appointment/ignore`, { id });
  return response.data;
};

export const getDashboardData = async () => {
  const response = await api.get("/api/admin");
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};

export const addProduct = async (data) => {
  const response = await api.post(`/api/admin`, data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/api/products/${id}`, data);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/api/appointment/${id}`);
  return response.data;
};

export const getOrder = async () => {
  const response = await api.get(`/api/orders`);
  return response.data;
};

export const createOrder = async () => {
  const response = await api.post(`/api/orders`);
  return response.data;
};
