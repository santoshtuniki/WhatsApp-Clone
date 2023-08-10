// module imports
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// component imports
import { Sidebar } from '../components/sidebar';
import { getConversations } from '../features/chatSlice';

function Home() {
    // Redux
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    // componentDidMount
    useEffect(() => {
        if (user) {
            dispatch(getConversations(user.token));
        }

        // componentWillUnmount
        return () => {
            console.log('componentWillUnmount Home.js');
        }
    }, [user])

    return (
        <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
            {/* Container */}
            <div className='container flex min-h-screen'>
                {/* Sidebar */}
                <Sidebar />
            </div>
        </div>
    )
}

// Default export
export default Home;