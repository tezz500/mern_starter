import axios from "axios";
const baseURL = "http://localhost:3001/api/v1/";
export default axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json"
    }
});