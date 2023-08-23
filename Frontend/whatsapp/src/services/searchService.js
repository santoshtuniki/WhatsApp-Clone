// module imports
import axios from 'axios';

// env variable
const { REACT_APP_API_ENDPOINT } = process.env;

// named exports
export const searchService = async (token, value) => {
    try {
        const { data } = await axios.get(`${REACT_APP_API_ENDPOINT}/user?search=${value}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error.response.data.error.message);
    }
}