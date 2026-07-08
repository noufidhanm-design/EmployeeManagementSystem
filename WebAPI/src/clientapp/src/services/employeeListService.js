

import axios from "axios";

const API_URL = "https://localhost:7142/api/Employees";

// Get all employees
export const getAllEmployees = () => {
    return axios.get(API_URL);
};

// Search employees by name or email
export const searchEmployees = (searchText) => {
    // Call the search API with query params
    return axios.get(`${API_URL}/search?name=${encodeURIComponent(searchText)}&email=${encodeURIComponent(searchText)}`);
};

// Delete employee by ID
export const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

