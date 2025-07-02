import axios from "axios";

export const SocialMediaApi = async (keyword) => {
	const token = localStorage.getItem("userToken");

	if (!token) {
		console.warn("No token found in localStorage.");
		return;
	}

	try {
		const response = await axios.get(
			`https://cms-reporting.runasp.net/api/Report/social-media-reports`,
			
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				params: {
          			search: keyword, 
       		 },
			}
		);
		console.log("Social Media Reports:", response.data.value);
		return response.data.value;
	} catch (error) {
		throw error;
	}
};

export default SocialMediaApi;
