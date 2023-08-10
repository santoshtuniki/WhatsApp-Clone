// module imports
import { useSelector } from 'react-redux';

// component imports
import Conversation from './Conversation';

function Conversations() {
    const { conversations } = useSelector((state) => state.chat);

    return (
        <div className='convos scrollbar'>
            <ul>
                {
                    conversations && conversations.map((convo) => [
                        <Conversation convo={convo} key={convo._id} />
                    ])
                }
            </ul>
        </div>
    )
}

// Default export
export default Conversations;