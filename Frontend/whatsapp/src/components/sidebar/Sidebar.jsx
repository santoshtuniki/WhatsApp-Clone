// component imports
import { SidebarHeader } from './header';
import { Notifications } from './notifications';
import { Search } from './search';

function Sidebar() {
    return (
        <div className='w-[40%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
            {/* Search */}
            <Search />
        </div>
    )
}

// Default export
export default Sidebar;