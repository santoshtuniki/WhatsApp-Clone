// module imports
import { useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

// component imports
import { EmojiPickerApp, Input } from './index';
import { Attachments } from './attachments';
import { SendIcon } from '../../../svg';
import { sendMessage } from '../../../features/chatSlice';
import SocketContext from '../../../context/SocketContext';

function ChatActions() {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false);
    const textRef = useRef();

    // context
    const socket = useContext(SocketContext);

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
        setLoading(true);

        const newMessage = await dispatch(sendMessage(values));
        socket.emit('send message', newMessage.payload);

        setMessage('');
        setLoading(false);
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
                    <EmojiPickerApp
                        textRef={textRef}
                        message={message}
                        setMessage={setMessage}
                        showPicker={showPicker}
                        setShowPicker={setShowPicker}
                        setShowAttachments={setShowAttachments}
                    />
                    <Attachments
                        showAttachments={showAttachments}
                        setShowAttachments={setShowAttachments}
                        setShowPicker={setShowPicker}
                    />
                </ul>
                {/*Input*/}
                <Input
                    message={message}
                    setMessage={setMessage}
                    textRef={textRef}
                />
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