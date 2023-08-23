// component imports
import { uploadFileToCloudinary, uploadImageToCloudinary } from '../services/cloudServices';

// env variables
const {
    REACT_APP_CLOUD_SECRET: cloud_secret,
    REACT_APP_CLOUD_NAME: cloud_name
} = process.env;

// named exports
export const uploadFiles = async (files) => {
    let formData = new FormData();
    formData.append('upload_preset', cloud_secret);
    
    let uploaded = [];

    for (const file_item of files) {
        const { file, type } = file_item;
        formData.append('file', file);
        const response = await uploadFileToCloudinary(cloud_name, formData);
        uploaded.push({
            file: response,
            type: type,
        });
    }

    return uploaded;
};

export const uploadImage = async (picture) => {
    const formData = new FormData();
    formData.append('upload_preset', cloud_secret);
    formData.append('file', picture);

    const response = await uploadImageToCloudinary(cloud_name, formData);
    return response
}