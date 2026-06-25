
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Designation`;

export const adddesignation = (designation) => {
    return axios.post(
        `${API_URL}/AddDesignation`,
        designation,
        {
            headers: { "Content-Type": "application/json" }
        }
    );
};






