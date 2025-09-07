import axios from "axios";

const BASE_URL = "http://192.168.0.103:8000/api";

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
});

// Login API
export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login/`, {
    username,
    password,
  });
  return response.data;
};

export const getSales = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/sales/?page=${page}`,
    authHeader()
  );
  return response.data;
};


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

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios
    .post(`${BASE_URL}/upload-csv/`, formData, authHeader())
    .then((res) => res.data);
};

export const getCsvLogs = () =>
  axios
    .get(`${BASE_URL}/csv-upload-logs`, authHeader())
    .then((res) => res.data);
