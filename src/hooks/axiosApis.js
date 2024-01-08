import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export const fetchUser = async (user) => {
	try {
		const { data } = await axios.post(`${apiUrl}/users`, user);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchAccount = async (user) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		};
		const { data } = await axios.get(`${apiUrl}/account`, config);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
