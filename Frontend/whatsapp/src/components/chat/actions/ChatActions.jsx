// module imports
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

// component imports
import { EmojiPicker, Attachments, Input } from './index';
import { SendIcon } from '../../../svg';
import { sendMessage } from '../../../features/chatSlice';

function ChatActions() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    // Redux
    const { user } = useSelector((state) => state.user);
    const { token } = user;

    const { activeConversation, status } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const values = {
        token,
        message,
        conversation_id: activeConversation?._id,
        files: []
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        await dispatch(sendMessage(values));

        setMessage('');
    }

    return (
        <form
            onSubmit={(e) => sendMessageHandler(e)}
            className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'
        >
            {/*Container*/}
            <div className='w-full flex items-center gap-x-2'>
                {/*Emojis and attachpments*/}
                <ul className='flex gap-x-2'>
                    <EmojiPicker />
                    <Attachments />
                </ul>
                {/*Input*/}
                <Input message={message} setMessage={setMessage} />
                {/*Send button*/}
                <button type='submit' className='btn'>
                    {
                        status === 'loading' && loading ? (
                            <ClipLoader color='#E9EDEF' size={25} />
                        ) : (
                            <SendIcon className='dark:fill-dark_svg_1' />
                        )
                    }
                </button>
            </div>
        </form>
    )
}

// Default export
export default ChatActions;