// module imports
import { useState } from 'react';

// component imports
import { SidebarHeader } from './header';
import { Notifications } from './notifications';
import { Search } from './search';

function Sidebar() {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className='w-[40%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
            {/* Search */}
            <Search searchLength={searchResults.length} />
        </div>
    )
}

// Default export
export default Sidebar;