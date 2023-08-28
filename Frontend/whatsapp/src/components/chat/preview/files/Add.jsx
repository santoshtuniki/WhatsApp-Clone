// module imports
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

// component imports
import { CloseIcon } from '../../../../svg';
import { addFiles } from '../../../../features/chatSlice';
import { getFileType, imageTypes, fileTypes, checkType } from '../../../../utils/file';

function Add() {
    // Redux
    const dispatch = useDispatch();

    const inputRef = useRef();

    const referenceTypes = [...fileTypes, ...imageTypes];

    const fileHandler = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            // check file type
            if (!checkType(file.type, referenceTypes)) {
                files = files.filter((item) => item.name !== file.name);
                return;
            }
            // check file size
            else if (file.size > 1024 * 1024 * 10) {    // 10 MB
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
                        fileData: getFileType(file.type) === 'IMAGE' ? e.target.result : '',
                        type: getFileType(file.type),
                    };
                    await dispatch(addFiles(values));
                };
            }
        });
    };

    return (
        <>
            <div
                onClick={() => inputRef.current.click()}
                className='w-14 h-14 mt-2 border dark:border-white rounded-md flex items-center justify-center cursor-pointer'
            >
                <span className='rotate-45'>
                    <CloseIcon className='dark:fill-dark_svg_1' />
                </span>
            </div>

            <input
                type='file'
                hidden
                multiple
                ref={inputRef}
                accept={`application/*,text/plain, ${imageTypes.join(', ')}`}
                onChange={fileHandler}
            />
        </>
    );
}

// Default export
export default Add