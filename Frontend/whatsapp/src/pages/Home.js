// module imports
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// component imports
import { Sidebar } from '../components/sidebar';
import { ChatContainer, WhatsappHome } from '../components/chat';
import { getConversations } from '../features/chatSlice';

function Home() {
    // Redux
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);

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
        <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden'>
            {/* Container */}
            <div className='container flex h-screen py-[19px]'>
                {/* Sidebar */}
                <Sidebar />
                {
                    activeConversation._id ? <ChatContainer /> : <WhatsappHome />
                }
            </div>
        </div>
    )
}

// Default export
export default Home;