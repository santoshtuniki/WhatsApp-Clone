// component imports
import { SidebarHeader } from './header';
import { Notifications } from './notifications';

function Sidebar() {
    return (
        <div className='w-[40%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
            {/* Notifications */}
            <Notifications />
        </div>
    )
}

// Default export
export default Sidebar;