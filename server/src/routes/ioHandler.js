const ioHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('addMessage', (input) => {
      const { playerName, playerId, value } = input;
      io.sockets.emit('newMessage', { playerName, playerId, value });
    });

    socket.on("addCanvas", (input) => {
      socket.broadcast.emit("newCanvas", input);
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected :(');
    });
  });
};

module.exports = { ioHandler };
