import axios from 'axios'
export const api = axios.create({
    baseURL: "http://localhost:4000/api/",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

