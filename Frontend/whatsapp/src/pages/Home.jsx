// module imports
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';

// component imports
import { Sidebar } from '../components/sidebar';
import { ChatContainer } from '../components/chat';
import { WhatsappHome } from '../components/chat/welcome';
import { getConversations, updateMessagesAndConversations } from '../features/chatSlice';
import SocketContext from '../context/SocketContext';

function Home() {
    // context
    const socket = useContext(SocketContext);

    // Redux
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typing, setTyping] = useState(false);

    //join user into the socket io
    useEffect(() => {
        socket.emit('join', user._id);

        // get online users
        socket.on('get-online-users', (users) => {
            return setOnlineUsers(users);
        });
    }, [user])

    // listening actions
    useEffect(() => {
        // listening to receiving a message
        socket.on('received message', (message) => {
            dispatch(updateMessagesAndConversations(message))
        })

        // listening when a user is typing
        socket.on('received message', () => setTyping(true));

        // listening when a user stops typing
        socket.on('received message', () => setTyping(false));
    }, [])

    // componentDidMount
    useEffect(() => {
        if (user) {
            dispatch(getConversations(user.token));
        }

        // componentWillUnmount
        return () => {
            console.log('componentWillUnmount Home.js');
        }
    }, [user])

    return (
        <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
            {/* Container */}
            <div className='container flex h-screen py-[19px]'>
                {/* Sidebar */}
                <Sidebar onlineUsers={onlineUsers} />
                {
                    activeConversation?._id ? (
                        <ChatContainer
                            onlineUsers={onlineUsers}
                            typing={typing}
                        />
                    ) : <WhatsappHome />
                }
            </div>
        </div>
    )
}

// Default export
export default Home;