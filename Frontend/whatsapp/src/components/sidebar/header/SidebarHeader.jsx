// module imports
import { useSelector } from 'react-redux';

function SidebarHeader() {

    const { user } = useSelector((state) => state.user);

    return (
        <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16">
            {/* Container */}
            <div className='w-full flex items-center justify-between'>
                {/* User Image */}
                <button className='btn'>
                    <img
                        src={user.picture}
                        alt={user.name}
                        className='w-full h-full rounded-full object-cover'
                    />
                </button>
            </div>
        </div>
    )
}

// Default export
export default SidebarHeader;