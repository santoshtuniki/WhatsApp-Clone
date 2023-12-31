// module imports
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';

// component imports
import { open_create_conversation } from '../../../features/chatSlice';
import SocketContext from '../../../context/SocketContext';

function Contact({ contact, setSearchResults }) {
    // context
    const socket = useContext(SocketContext);

    // Redux
    const { user } = useSelector((state) => state.user);
    const { token } = user;

    const dispatch = useDispatch();

    const values = {
        token,
        receiver_id: contact._id,
    }

    const openConversation = async () => {
        const newConversation = await dispatch(open_create_conversation(values))
        await socket.emit('join conversation', newConversation.payload._id);
        setSearchResults([]);
    }

    return (
        <li
            onClick={() => openConversation()}
            className='list-none h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]'
        >
            {/* Container */}
            <div className='flex items-center gap-x-3 py-[10px]'>
                {/* Contact infos */}
                <div className='flex items-center gap-x-3'>
                    {/* Conversation user picture */}
                    <div className='relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden'>
                        <img
                            src={contact.picture}
                            alt={contact.name}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    {/* Conversation name and message */}
                    <div className='w-full flex flex-col'>
                        {/* Conversation name */}
                        <h1 className='font-bold flex items-center gap-x-2'>
                            {contact.name}
                        </h1>
                        {/* Conversation message */}
                        <div>
                            <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                                <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2'>
                                    <p>{contact.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Border */}
            <div className='ml-16 border-b dark:border-b-dark_border_1'></div>
        </li>
    )
}

// Default export
export default Contact;