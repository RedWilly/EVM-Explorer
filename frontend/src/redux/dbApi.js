import axios from "axios";

const dbApi = axios.create({
    baseURL: "https://backend-wjjy.onrender.com",
    //baseURL : "https://dev-explorer-server.gen.foundation",
    headers: { 'content-type': "application/json" }
})

export default dbApi