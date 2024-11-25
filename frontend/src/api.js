import axios from 'axios';

// Set the base URL for all API requests
const API = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust the URL for your backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to include the JWT token in requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Authentication API
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);

// User Management API
export const getUsers = () => API.get('/users');
export const blockUser = (userId) => API.post(`/users/block`, { id: userId });
export const unblockUser = (userId) => API.post(`/users/unblock`, { id: userId });
export const deleteUser = (userId) => API.post(`/users/delete`, { id: userId });

export default API;