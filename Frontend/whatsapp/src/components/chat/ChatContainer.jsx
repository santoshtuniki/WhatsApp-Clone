// module imports
import { useSelector } from 'react-redux';

// component imports
import { ChatHeader, ChatMessages } from './index';

function ChatContainer() {
    // Redux
    const { activeConversation } = useSelector((state) => state.chat);
    const { name, picture } = activeConversation;
    
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