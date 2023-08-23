// module imports
import axios from 'axios';

// named exports
export const getService = async (URL, token, rejectWithValue) => {
    try {
        const { data } = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
}

export const postService = async (URL, values, token, rejectWithValue) => {
    try {
        const { data } = await axios.post(
            URL,
            values,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
}