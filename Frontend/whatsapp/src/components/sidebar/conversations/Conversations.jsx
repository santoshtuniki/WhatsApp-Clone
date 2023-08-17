// module imports
import { useSelector } from 'react-redux';

// component imports
import Conversation from './Conversation';

function Conversations() {
    const { conversations, activeConversation } = useSelector((state) => state.chat);

    return (
        <div className='convos scrollbar'>
            <ul>
                {
                    conversations && conversations
                        .filter((convo) => convo.latestMessage || convo._id === activeConversation._id)
                        .map((convo) => [
                            <Conversation convo={convo} key={convo._id} />
                        ])
                }
            </ul>
        </div>
    )
}

// Default export
export default Conversations;