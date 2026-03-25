import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://aadithya-super-store-1.onrender.com';
const API_URL = `${BASE_URL}/auth`;

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('user');
};
