// component imports
import { Sidebar } from '../components/sidebar';

function Home() {
    return (
        <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
            {/* Container */}
            <div className='container flex'>
                {/* Sidebar */}
                <Sidebar />
            </div>
        </div>
    )
}

// Default export
export default Home;