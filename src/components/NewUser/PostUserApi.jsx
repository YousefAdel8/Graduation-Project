import axios from 'axios';

export const  postUserApi = async (data) => {
  const token = localStorage.getItem("userToken");

  if (!token) {
    console.warn("No token found in localStorage.");
    return;
  }

  try {
    const response = await axios.post(
      "https://cms-reporting.runasp.net/api/users",data,
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

export default postUserApi;
