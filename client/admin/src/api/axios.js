import axios from "axios";

const axiosInstance = axios.create({
	//baseURL: "https://punktual-api.onrender.com",
	baseURL: "http://127.0.0.1:5000",
});

export default axiosInstance;
