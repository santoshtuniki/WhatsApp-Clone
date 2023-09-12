// module imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import { ChatHeader } from './header';
import { ChatMessages } from './messages';
import { ChatActions } from './actions';
import { getConversationMessages } from '../../features/chatSlice';
import { checkOnlineStatus } from '../../utils/chat';
import { FilesPreview } from './preview/files';

function ChatContainer({ onlineUsers, typing, callUser }) {
    // Redux
    const { user } = useSelector((state) => state.user);
    const { token } = user;
    const { activeConversation, files } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const values = {
        token,
        conversation_id: activeConversation?._id
    }

    // componentDidUpdate
    useEffect(() => {
        if (activeConversation._id) {
            dispatch(getConversationMessages(values))
        }
    }, [activeConversation]);

    return (
        <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
            {/* Container */}
            <div>
                {/* Chat header */}
                <ChatHeader
                    online={
                        activeConversation.isGroup
                            ? false
                            : checkOnlineStatus(onlineUsers, user, activeConversation.users)
                    }
                    callUser={callUser}
                />
                {
                    files.length > 0 ? (
                        <FilesPreview />
                    ) : (
                        <>
                            {/* Chat messages */}
                            <ChatMessages typing={typing} />
                            {/* Chat Actions */}
                            <ChatActions />
                        </>
                    )
                }
            </div>
        </div>
    )
}

// Default exports
export default ChatContainer