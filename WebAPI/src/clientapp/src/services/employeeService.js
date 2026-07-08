

import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Employees`;

// ✅ Add employee
//export const addEmployee = (employee) => {
//    return axios.post(API_URL, employee, {
//        headers: { "Content-Type": "application/json" }
//    });
//};
export const addEmployee = (employeeFormData) => {
    return axios.post(API_URL, employeeFormData);
};

// ✅ Get employee by ID (for Edit)
export const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

//getnext employee id
export const getNextEmployeeId = () => {
    return axios.get(`${API_URL}/next-id`);
};

// ✅ Update employee
export const updateEmployee = (id, employeeFormData) => {
    return axios.put(`${API_URL}/${id}`, employeeFormData);
};
//export const updateEmployee = (id, employee) => {
//    return axios.put(`${API_URL}/${id}`, employee, {
//        headers: { "Content-Type": "application/json" }
//    });
//};





