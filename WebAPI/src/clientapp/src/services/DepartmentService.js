
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Department`;

export const adddepartment = (department) => {
    return axios.post(
        `${API_URL}/AddDepartment`,
        department,
        {
            headers: { "Content-Type": "application/json" }
        }
    );
};


export const getDepartments = () => {
    return axios.get(`${API_URL}/GetDepartments`);


};



