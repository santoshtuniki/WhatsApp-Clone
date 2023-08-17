// module imports
import { useRef, useState } from 'react';

function Picture({ readablePicture, setReadablePicture, setPicture }) {

    const [error, setError] = useState('');

    const inputRef = useRef();

    const handlePicture = (e) => {
        const pic = e.target.files[0];
        if (
            pic.type !== 'image/png' &&
            pic.type !== 'image/jpg' &&
            pic.type !== 'image/jpeg' &&
            pic.type !== 'image/webp'
        ) {
            setError(`${pic.name} format is not supported.`);
            return;
        }
        else if (pic.size > 1024 * 1024 * 5) {  // 5MB
            setError(`${pic.name} is too large, maximum 5 MB allowed.`);
            return;
        }
        else {
            setError('');
            setPicture(pic);

            // reading the picture
            const reader = new FileReader();
            reader.readAsDataURL(pic);
            reader.onload = (e) => {
                setReadablePicture(e.target.result)
            }
        }
    }

    const handleChangePic = () => {
        // reset everything
        setPicture('');
        setReadablePicture('');
    }

    return (
        <div className='mt-8 content-center dark:text-dark_text_1'>
            <label htmlFor='picture' className='text-sm font-bold tracking-wide'>
                Picture ( Optional )
            </label>
            {/* Upload Button */}
            {
                readablePicture ? (
                    <div>
                        <img
                            src={readablePicture}
                            alt='DP'
                            className='w-20 h-20 object-cover rounded-full'
                        />
                        {/* Change Pic */}
                        <div
                            onClick={() => handleChangePic()}
                            className='mt-2 w-20 py-2 dark:bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer'
                        >
                            Remove
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => inputRef.current.click()}
                        className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer'
                    >
                        Upload Picture
                    </div>
                )
            }
            {/* input upload */}
            <input
                type='file' name='picture' id='picture' hidden ref={inputRef}
                accept='image/png, image/jpeg, image/jpg, image/webp'
                onChange={handlePicture}
            />
            {/* error */}
            {
                error ? (
                    <div>
                        <p className='text-red-400'>{error}</p>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Picture;