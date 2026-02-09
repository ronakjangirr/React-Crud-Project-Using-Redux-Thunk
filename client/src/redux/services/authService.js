import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

export const registerUser = async (userData) => {
    // console.log("Registering user with data:", userData); // Debug log
    const response = await axios.post(
        `${API_URL}/register`,
        userData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return response.data;
};

export const loginUser = async (loginData) => {
    // console.log("Logging in user with data:", loginData); // Debug log
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
};


