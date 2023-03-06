import axios from "axios";
import { API_URL, API_URL_LOCAL } from "@env";

const instance = axios.create({
	baseURL: API_URL_LOCAL, // set the api url in .env file
});

export default instance;
