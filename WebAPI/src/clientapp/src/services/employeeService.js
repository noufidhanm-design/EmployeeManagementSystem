
////import axios from "axios";

////const API_URL = `${process.env.REACT_APP_API_URL}/Employees`;

////export const addEmployee = (movie) => {
////    return axios.post(API_URL, movie, {
////        headers: { "Content-Type": "application/json" }
////    });
////};






import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Employees`;

// ✅ Add employee
export const addEmployee = (employee) => {
    return axios.post(API_URL, employee, {
        headers: { "Content-Type": "application/json" }
    });
};

// ✅ Get employee by ID (for Edit)
export const getEmployeeById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// ✅ Update employee
export const updateEmployee = (id, employee) => {
    return axios.put(`${API_URL}/${id}`, employee, {
        headers: { "Content-Type": "application/json" }
    });
};





