import axios from "axios";

export const editUserApi = async (id, data) => {
	const token = localStorage.getItem("userToken");

	if (!token) {
		console.warn("No token found in localStorage.");
		return;
	}

	try {
		const response = await axios.put(
			`https://cms-reporting.runasp.net/api/users/${id}`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log("Response Data:", response.data);
		return response;
	} catch (error) {
		console.error("Error changing password:", error);
		throw error;
	}
};

export default editUserApi;
