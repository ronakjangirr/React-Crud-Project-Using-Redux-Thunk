import axios from "axios";

// const API_URL = "http://localhost:5000/api"; 

export const createUserApi = async (userData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
 "http://localhost:8000/api/users/create",
     {
      ...userData,
      role: "user", 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


export const getUsersApi = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:8000/api/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteUserApi = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `http://localhost:8000/api/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateUserApi = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `http://localhost:8000/api/users/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
