import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

// ✅ Attach token to all requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

// ✅ Authentication API
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);

// ✅ Customers API
export const fetchCustomers = () => API.get("/customers");
export const addCustomer = (customer) => API.post("/customers", customer);
export const updateCustomer = (id, customer) => API.put(`/customers/${id}`, customer);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

export default API;
