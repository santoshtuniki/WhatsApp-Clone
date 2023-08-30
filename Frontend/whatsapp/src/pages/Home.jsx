// module imports
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState, useRef } from 'react';

// component imports
import { Sidebar } from '../components/sidebar';
import { ChatContainer } from '../components/chat';
import { WhatsappHome } from '../components/chat/welcome';
import { getConversations, updateMessagesAndConversations } from '../features/chatSlice';
import SocketContext from '../context/SocketContext';
import { Call } from '../components/chat/call';
import { getConversationName, getConversationPicture } from '../utils/chat';

// callData
const callData = {
    receivingCall: true,
    callEnded: false,
    socketId: '',
    name: '',
    picture: '',
};

function Home() {
    // context
    const socket = useContext(SocketContext);

    // Redux
    const { user } = useSelector((state) => state.user);
    const { activeConversation } = useSelector((state) => state.chat);

    const dispatch = useDispatch();

    // online State
    const [onlineUsers, setOnlineUsers] = useState([]);

    // message State
    const [typing, setTyping] = useState(false);

    // call State
    const [call, setCall] = useState(callData);

    const { receivingCall, callEnded, socketId } = call;
    const [callAccepted, setCallAccepted] = useState(false);

    // stream state
    const [stream, setStream] = useState();

    // references
    const myVideo = useRef();
    const userVideo = useRef();

    // callUser function
    const callUser = () => {
        enableMedia();
        setCall({
            ...call,
            name: getConversationName(user, activeConversation.users),
            picture: getConversationPicture(user, activeConversation.users),
        });
    }

    // enableMedia function
    const enableMedia = () => {
        myVideo.current.srcObject = stream;
    }

    // setupMedia function
    const setupMedia = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
            });
    }

    // call useEffect
    useEffect(() => {
        setupMedia();
        socket.on("setup socket", (id) => {
            setCall({ ...call, socketId: id });
        });
    }, [])

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
        socket.on('typing', (conversation) => setTyping(conversation));

        // listening when a user stops typing
        socket.on('stop typing', () => setTyping(false));
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
        <>
            <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
                {/* Container */}
                <div className='container flex h-screen py-[19px]'>
                    {/* Sidebar */}
                    <Sidebar
                        onlineUsers={onlineUsers}
                        typing={typing}
                    />
                    {
                        activeConversation?._id ? (
                            <ChatContainer
                                onlineUsers={onlineUsers}
                                typing={typing}
                                callUser={callUser}
                            />
                        ) : <WhatsappHome />
                    }
                </div>
            </div>

            {/* Call */}
            <Call
                call={call}
                setCall={setCall}
                callAccepted={callAccepted}
                myVideo={myVideo}
                userVideo={userVideo}
                stream={stream}
            />
        </>
    )
}

// Default export
export default Home;