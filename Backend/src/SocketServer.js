// component imports

function SocketServer(socket) {
    // user joins or opens connection
    socket.on('join', (user) => {
        socket.join(user);
        console.log('user has joined: ', user);
    })

    // join conversation
    socket.on('join conversation', (conversation) => {
        socket.join(conversation);
        console.log('user has joined the conversation: ', conversation);
    })
}

// Default export
export default SocketServer;