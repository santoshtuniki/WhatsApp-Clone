// module imports
import { useState } from 'react';

// component imports
import { FilterIcon, ReturnIcon, SearchIcon } from '../../../svg';

function Search({ searchLength }) {
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {

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
                                <span className='w-8 flex items-center justify-center rotateAnimation'>
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