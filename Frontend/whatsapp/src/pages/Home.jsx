// module imports
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState, useRef } from 'react';
import Peer from 'simple-peer';

// component imports
import { Sidebar } from '../components/sidebar';
import { ChatContainer } from '../components/chat';
import { WhatsappHome } from '../components/chat/welcome';
import { getConversations, updateMessagesAndConversations } from '../features/chatSlice';
import SocketContext from '../context/SocketContext';
import { Call } from '../components/chat/call';
import { getConversationName, getConversationPicture, getConversationId } from '../utils/chat';

// callData
const callData = {
    receivingCall: false,
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
    const [callAccepted, setCallAccepted] = useState(false);
    const [totalSecInCall, setTotalSecInCall] = useState(0);

    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const { receivingCall, callEnded, socketId } = call;

    // stream state
    const [stream, setStream] = useState(null);

    // references
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    // call useEffect
    useEffect(() => {
        setupMedia();
        socket.on('setup socket', (id) => {
            setCall({ ...call, socketId: id });
        });

        socket.on('call user', (data) => {
            setCall({
                ...call,
                socketId: data.from,
                name: data.name,
                picture: data.picture,
                signal: data.signal,
                receivingCall: true,
            });
        });

        socket.on('end call', () => {
            setShow(false);
            setCall({ ...call, callEnded: true, receivingCall: false });

            if (myVideo.current) {
                myVideo.current.srcObject = null;
            }

            if (callAccepted) {
                connectionRef?.current?.destroy();
            }
        });
    }, [])

    // callUser function
    const callUser = () => {
        if (stream === null) {
            alert(error);
        } else {
            enableMedia();
            setCall({
                ...call,
                name: getConversationName(user, activeConversation.users),
                picture: getConversationPicture(user, activeConversation.users),
            });

            // peer
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream,
            });

            peer.on('signal', (data) => {
                socket.emit('call user', {
                    userToCall: getConversationId(user, activeConversation.users),
                    signal: data,
                    from: socketId,
                    name: user.name,
                    picture: user.picture,
                });
            });

            peer.on('stream', (stream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

            socket.on('call accepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;
        }
    }

    // answerCall function
    const answerCall = () => {
        if (stream === null) {
            alert(error);
        } else {
            enableMedia();
            setCallAccepted(true);

            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });

            peer.on('signal', (data) => {
                socket.emit('answer call', { signal: data, to: call.socketId });
            });

            peer.on('stream', (stream) => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

            peer.signal(call.signal);

            connectionRef.current = peer;
        }
    };

    // endCall  function
    const endCall = () => {
        setShow(false);
        setCall({
            ...call,
            callEnded: true,
            receivingCall: false
        });

        if (myVideo.current) {
            myVideo.current.srcObject = null;
        }

        socket.emit('end call', call.socketId);

        connectionRef?.current?.destroy();
    };

    // enableMedia function
    const enableMedia = () => {
        if (myVideo.current) {
            myVideo.current.srcObject = stream;
        }
        setShow(true);
    }

    // setupMedia function
    const setupMedia = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
            })
            .catch((error) => {
                // Handle the error here
                if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                    // The requested device was not found
                    setError('The device you requested was not found.');
                } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                    // The user denied permission to access the device
                    setError('Permission to access the device was denied by the user.');
                } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
                    // The requested constraints were not satisfied
                    setError('The requested constraints were not satisfied by any available devices.');
                } else {
                    // Handle other errors
                    setError('An error occurred while trying to access the device: ' + error.message);
                }
            });
    }

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
            <div className={(show || call.signal) && !call.callEnded ? '' : 'hidden'}>
                <Call
                    call={call}
                    setCall={setCall}
                    callAccepted={callAccepted}
                    myVideo={myVideo}
                    userVideo={userVideo}
                    stream={stream}
                    answerCall={answerCall}
                    show={show}
                    endCall={endCall}
                    totalSecInCall={totalSecInCall}
                    setTotalSecInCall={setTotalSecInCall}
                />
            </div>
        </>
    )
}

// Default export
export default Home;