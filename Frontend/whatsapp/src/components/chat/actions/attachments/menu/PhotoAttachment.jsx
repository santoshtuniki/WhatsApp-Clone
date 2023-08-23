// module imports
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

// component imports
import { PhotoIcon } from '../../../../../svg';
import { addFiles } from '../../../../../features/chatSlice';
import { getFileType, imageTypes, checkType } from '../../../../../utils/file';

function PhotoAttachment() {
    // Redux
    const dispatch = useDispatch();

    const inputRef = useRef();

    const imageHandler = (e) => {
        let files = Array.from(e.target.files);

        files.forEach((file) => {
            // check file type
            if (!checkType(file.type, imageTypes)) {
                files = files.filter((item) => item.name !== file.name);
                return;
            }
            // check file size
            else if (file.size > 1024 * 1024 * 10) {
                files = files.filter((item) => item.name !== file.name);
                return;
            }
            // else read data
            else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async (e) => {
                    const values = {
                        file: file,
                        fileData: e.target.result,
                        type: getFileType(file.type),
                    }
                    await dispatch(addFiles(values));
                };
            }
        })
    }

    return (
        <li>
            <button
                type='button'
                className='bg-[#BF59CF] rounded-full'
                onClick={() => inputRef.current.click()}
            >
                <PhotoIcon />
            </button>
            <input
                type='file'
                hidden
                multiple
                ref={inputRef}
                accept={imageTypes.join(', ')}
                onChange={imageHandler}
            />
        </li>
    )
}

// Default export
export default PhotoAttachment;