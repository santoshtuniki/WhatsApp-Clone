// module imports
import { useState } from 'react';

// component imports
import { SidebarHeader } from './header';
import { Notifications } from './notifications';
import { Search, SearchResults } from './search';
import { Conversations } from './conversations';

function Sidebar() {
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className='w-[40%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
            {/* Search */}
            <Search searchLength={searchResults.length} setSearchResults={setSearchResults} />
            {
                searchResults.length > 0 ? (
                    <SearchResults searchResults={searchResults}/>
                ) : (
                    < Conversations />
                )
            }
        </div>
    )
}

// Default export
export default Sidebar;