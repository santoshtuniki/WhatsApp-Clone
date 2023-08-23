// module imports
import { useState } from 'react';
import { useSelector } from 'react-redux';

// component imports
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg';
import { searchService } from '../../../services/searchService';

function Search({ searchLength, setSearchResults }) {
    const [show, setShow] = useState(false);

    // token
    const { user } = useSelector((state) => state.user);
    const { token } = user;

    const handleSearch = async (e) => {
        if (e.target.value && e.key === 'Enter') {
            const response = await searchService(token, e.target.value);
            response.length > 0 ? setSearchResults(response) : setSearchResults([]);
        } else {
            setSearchResults([]);
        }
    }

    return (
        <div className='h-[49px] py-1.5'>
            {/* Container */}
            <div className='px-[10px]'>
                {/* Dearch Input Container */}
                <div className='flex items-center gap-x-2'>
                    <div className='w-full flex  dark:bg-dark_bg_2 rounded-lg pl-2'>
                        {
                            (show || searchLength > 0) ? (
                                <span
                                    onClick={() => setSearchResults([])}
                                    className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
                                >
                                    <ReturnIcon className='fill-green_1 w-5' />
                                </span>
                            ) : (
                                <span className='w-8 flex items-center justify-center'>
                                    <SearchIcon className='dark:fill-dark_svg_2 w-5' />
                                </span>
                            )
                        }
                        <input
                            type='text'
                            placeholder='Search or start a new chat'
                            className='input'
                            onFocus={() => setShow(true)}
                            onBlur={() => searchLength === 0 && setShow(false)}
                            onKeyDown={(e) => handleSearch(e)}
                        />
                    </div>
                    {/* Filter button */}
                    <button className='btn'>
                        <FilterIcon className='dark:fill-dark_svg_2' />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Default export
export default Search