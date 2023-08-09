// component imports
import { SidebarHeader } from "./header"

function Sidebar() {
    return (
        <div className='w-[40%] h-full select-none'>
            {/* Sidebar Header */}
            <SidebarHeader />
        </div>
    )
}

// Default export
export default Sidebar;