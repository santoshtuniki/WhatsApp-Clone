// module imports
import { useSelector } from 'react-redux';

// component imports
import { Message } from './index';

function ChatMessages() {
    // Redux
    const { messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.user);

    return (
        <div
            className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
                        bg-cover bg-no-repeat"
        >
            {/* Container */}
            <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]'>
                {/*Messages*/}
                {
                    messages && messages.map((message) => (
                        <Message message={message} key={message._id} me={user._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatMessages