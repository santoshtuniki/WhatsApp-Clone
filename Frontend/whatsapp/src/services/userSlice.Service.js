// module imports
import axios from 'axios';

// named exports
export const postService = async (URL, values, rejectWithValue) => {
    try {
        const { data } = await axios.post(URL, values);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
}