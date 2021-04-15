import axios from 'axios';

export default axios.create({
  baseURL: process.env.VUE_APP_APIGATEWAY,
  params: {
    // API params go here
  }
});