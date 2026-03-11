import axios from "axios"


const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
    'Content-Type': 'application/json',
  },
})
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data.data; 
    }
    return response;
  },
  (error) => {
  
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;