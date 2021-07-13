import axios from 'axios';

const api = axios.create({
  baseURL: "https://moove-verde.herokuapp.com",
});


export default api;
