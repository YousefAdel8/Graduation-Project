import React from 'react';
import axios from 'axios';

export const  DeleteUserApi = async (id) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    console.warn("No token found in localStorage.");
    return;
  }

  try {
    const response = await axios.delete(
      `https://cms-reporting.runasp.net/api/users/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response Data:", response.data);
    return response.data;

  } catch (error) {
    console.error("Error fetching user report:", error);
  }
};

export default DeleteUserApi;
