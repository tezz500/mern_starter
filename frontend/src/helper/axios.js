import axios from "axios";
import { getToken } from '../helper/helper';
const baseURL = "http://localhost:3001/api/v1/";
export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
        "Authorization":`Bearer ${getToken()}`
    }
});