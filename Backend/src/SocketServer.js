let onlineUsers = [];

function SocketServer(socket, io) {
    // user joins or opens connection
    socket.on('join', (user) => {   // user_id
        socket.join(user);

        // add joined users to onlineUsers
        if (!onlineUsers.some(u => u.userId === user)) {
            console.log(`user ${user} is online.`)
            onlineUsers.push({ userId: user, socketId: socket.id })
        }

        // send online users to frontend
        io.emit('get-online-users', onlineUsers);
    })

    // socket disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit('get-online-users', onlineUsers);
    })

    // join conversation
    socket.on('join conversation', (conversation) => {  // conversation._id
        socket.join(conversation);
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