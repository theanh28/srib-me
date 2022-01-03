const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
  },
});
// const cors = require('cors');
// app.use(cors());
const PORT = process.env.PORT || 3000;
const index = require('./routes/index.js');
app.use(index);
const ioHandler = require('./routes/ioHandler.js').ioHandler;
ioHandler(io);
httpServer.listen(PORT, function () {
  return console.log('Listening on port ', PORT);
});
