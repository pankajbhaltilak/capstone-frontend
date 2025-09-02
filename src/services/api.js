import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// Login API
export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login/`, {
    username,
    password,
  });
  return response.data;
};

// Fetch sales API
export const getSales = async (token, page = 1) => {
  const response = await axios.get(`${BASE_URL}/sales/?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Attach JWT to requests
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

// 🔹 KPIs
export const getKPIs = () =>
  axios.get(`${BASE_URL}/analytics/kpi/`, authHeader()).then((res) => res.data);

// 🔹 Sales Trend
export const getSalesTrend = () =>
  axios.get(`${BASE_URL}/sales-trend/`, authHeader()).then((res) => res.data);

// 🔹 Sales by Category
export const getSalesByCategory = () =>
  axios
    .get(`${BASE_URL}/sales-by-category/`, authHeader())
    .then((res) => res.data);

// 🔹 Orders by Status
export const getOrdersByStatus = () =>
  axios
    .get(`${BASE_URL}/orders-by-status/`, authHeader())
    .then((res) => res.data);

export const getSalesByRegion = () =>
  axios
    .get(`${BASE_URL}/sales/region/`, authHeader())
    .then((res) => res.data);

export const getTopCities = () =>
  axios
    .get(`${BASE_URL}/sales/top-cities/`, authHeader())
    .then((res) => res.data);

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/register/`, {
    username,
    email,
    password,
  });
  return response.data;
};

