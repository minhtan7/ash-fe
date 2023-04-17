import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
});

api.interceptors.request.use(
    (request) => {
        console.log("Start Request", request);
        return request;
    },
    function (error) {
        console.log("REQUEST ERROR", { error });
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log("Response", response);
        return response.data;
    },
    function (error) {
        console.log("RESPONSE ERROR", { error });
        const message = error.response?.data?.errors?.message || "Unknown Error";
        return Promise.reject({ message });
    }
);

export default api;