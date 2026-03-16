import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// -- User Profile --
export const getUserProfile = async () => {
  const { data } = await axios.get(`${API_URL}/users/profile`, { headers: getAuthHeaders() });
  return data;
};

export const updateUserProfile = async (userData) => {
  const { data } = await axios.put(`${API_URL}/users/profile`, userData, { headers: getAuthHeaders() });
  return data;
};

// -- Cart --
export const fetchCart = async () => {
  const { data } = await axios.get(`${API_URL}/cart`, { headers: getAuthHeaders() });
  return data;
};

export const syncCartAdd = async (cartItem) => {
  const { data } = await axios.post(`${API_URL}/cart/add`, cartItem, { headers: getAuthHeaders() });
  return data;
};

export const syncCartRemove = async (productId) => {
  const { data } = await axios.delete(`${API_URL}/cart/${productId}`, { headers: getAuthHeaders() });
  return data;
};

export const syncCartClear = async () => {
  const { data } = await axios.delete(`${API_URL}/cart`, { headers: getAuthHeaders() });
  return data;
};

// -- Payment & Orders --
// -- Orders --
export const createOrder = async (orderData) => {
  const { data } = await axios.post(`${API_URL}/orders`, orderData, { headers: getAuthHeaders() });
  return data;
};

export const getMyOrders = async () => {
  const { data } = await axios.get(`${API_URL}/orders/myorders`, { headers: getAuthHeaders() });
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await axios.get(`${API_URL}/orders/${id}`, { headers: getAuthHeaders() });
  return data;
};

// -- Products --
export const getProducts = async () => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};
export const getProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};
export const createProduct = async (productData) => {
  const { data } = await axios.post(`${API_URL}/products`, productData, { headers: getAuthHeaders() });
  return data;
};
export const updateProduct = async (id, productData) => {
  const { data } = await axios.put(`${API_URL}/products/${id}`, productData, { headers: getAuthHeaders() });
  return data;
};
export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API_URL}/products/${id}`, { headers: getAuthHeaders() });
  return data;
};
