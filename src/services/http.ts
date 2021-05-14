import axios, { AxiosRequestConfig } from 'axios';

var http = axios.create({
  baseURL: process.env.VUE_APP_API_GATEWAY,
  params: {
    // API params go here
  },
});

http.interceptors.request.use((config: AxiosRequestConfig) : AxiosRequestConfig => {
  setTimeout(() => {
    return config;
  }, 3000);
  return config;
});


export default http;