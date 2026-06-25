//import axios from "axios";

//export const addMovie = (movie) => {
//    return axios.post(
//        "https://localhost:7142/api/Movie",
//        movie,
//        {
//            headers: {
//                "Content-Type": "application/json"
//            }
//        }
//    );
//};
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/Movie`;

export const addMovie = (movie) => {
    return axios.post(API_URL, movie, {
        headers: { "Content-Type": "application/json" }
    });
};

