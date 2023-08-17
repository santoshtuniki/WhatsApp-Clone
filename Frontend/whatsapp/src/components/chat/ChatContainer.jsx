// module imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import { ChatHeader, ChatMessages } from './index';
import { getConversationMessages } from '../../features/chatSlice';

function ChatContainer() {
    // Redux
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const { activeConversation } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const values = {
        token,
        conversation_id: activeConversation?._id
    }

    // componentDidUpdate
    useEffect(() => {
        if (activeConversation?._id) {
            dispatch(getConversationMessages(values))
        }
    }, [activeConversation]);

    return (
        <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
            {/* Container */}
            <div>
                {/* Chat header */}
                <ChatHeader />
                {/* Chat messages */}
                <ChatMessages />
            </div>
        </div>
    )
}

// Default exports
export default ChatContainer