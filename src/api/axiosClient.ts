import axios from "axios"
const axiosClient = axios.create({
    baseURL: 'http://localhost:2512/lapyen_api',
    timeout: 10000,
    headers: {
    'Content-Type': 'application/json',
  },
})
axiosClient.interceptors.response.use(
  (response) => {
        if (response.data && response.data.data !== undefined) {
            return response.data.data; 
        }
        return response.data;
    },
  (error) => {
    if (error.response?.status === 401) {
        console.warn("Token tèo rồi, cút về Login!");
        localStorage.removeItem('token');
        localStorage.removeItem('userRole'); 
        window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;