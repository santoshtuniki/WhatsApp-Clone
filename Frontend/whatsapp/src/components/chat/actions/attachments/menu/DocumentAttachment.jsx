// module imports
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

// component imports
import { DocumentIcon } from '../../../../../svg';
import { addFiles } from '../../../../../features/chatSlice';
import { getFileType } from '../../../../../utils/file';
import { fileTypes } from '../../../../../utils/type';

function DocumentAttachment() {
    // Redux
    const dispatch = useDispatch();

    const inputRef = useRef();

    const checkType = (type) => {
        return fileTypes.some((file_type) => file_type === type)
    };

    const documentHandler = (e) => {
        let files = Array.from(e.target.files);

        files.forEach((file) => {
            // check file type
            if (!checkType(file.type)) {
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
                className='bg-[#5F66CD] rounded-full'
                onClick={() => inputRef.current.click()}
            >
                <DocumentIcon />
            </button>
            <input
                type='file'
                hidden
                multiple
                ref={inputRef}
                accept='application/*,text/plain'
                onChange={documentHandler}
            />
        </li>
    )
}

// Default export
export default DocumentAttachment;