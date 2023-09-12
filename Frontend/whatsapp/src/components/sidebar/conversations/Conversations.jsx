// module imports
import { useSelector } from 'react-redux';

// component imports
import { Conversation } from './index';
import { checkOnlineStatus } from '../../../utils/chat';

function Conversations({ onlineUsers, typing }) {
    const { conversations, activeConversation } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);

    return (
        <div className='convos scrollbar'>
            <ul>
                {
                    conversations && conversations
                        .filter(
                            (convo) =>
                                convo.latestMessage ||
                                convo._id === activeConversation._id ||
                                convo.isGroup == true
                        )
                        .map((convo) => {
                            const check = checkOnlineStatus(onlineUsers, user, convo.users);
                            return (
                                <Conversation
                                    key={convo._id}
                                    convo={convo}
                                    online={!convo.isGroup && check ? true : false}
                                    typing={typing}
                                />
                            )
                        })
                }
            </ul>
        </div>
    )
}

// Default export
export default Conversations;