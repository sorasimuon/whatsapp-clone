import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://whatsapp-bck.herokuapp.com/",
});

export default instance;
