// module imports
import axios from 'axios';

// named exports
export const uploadFileToCloudinary = async (cloud_name, formData) => {
    try {
        // uploading
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, formData);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const uploadImageToCloudinary = async (cloud_name, formData) => {
    try {
        // uploading
        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        return data;
    } catch (error) {
        console.log(error);
    }
};