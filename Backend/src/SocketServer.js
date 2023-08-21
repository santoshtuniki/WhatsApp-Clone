// component imports

function SocketServer(socket) {
    // user joins or opens connection
    socket.on('join', (user) => {   // user_id
        socket.join(user);
        console.log('user has joined: ', user);
    })

    // join conversation
    socket.on('join conversation', (conversation) => {  // conversation._id
        socket.join(conversation);
        console.log('user has joined the conversation: ', conversation);
    })

    // send and receive message
    socket.on('send message', (message) => {
        const { conversation } = message;

        // check if conversation has users
        if (!conversation.users) return;

        // if conversation has users
        conversation.users.forEach((user) => {
            if (user._id == message.sender._id) return;
            // send to a particular user
            socket.in(user._id).emit('received message', message);
        });
    })
}

// Default export
export default SocketServer;