import axios from "axios";

const token = localStorage.getItem("user-token");
axios.defaults.headers['x-access-token'] =  `${token}`;

const instance = axios.create({
  baseURL: "http://localhost:9000",
});

export default instance;
