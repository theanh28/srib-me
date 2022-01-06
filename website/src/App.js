import './App.css';

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';

import { AuthProvider } from './Stores/useAuth';
import GameBoard from './Components/GameBoard';
import Chat from './Components/Chat';
import {
  generatePlayerName,
  getPlayerToken,
  getPlayerName,
  setPlayerToken,
  setPlayerName,
} from './Utils/Player';

const setup = () => {
  if (!getPlayerToken()) { // anonymous player / not logged in
    setPlayerToken(uuid());
  }
  if (!getPlayerName()) {
    setPlayerName(generatePlayerName());
  }
};
const cleanup = () => {};

function App() {
  const [socket, setsocket] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setup();
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setsocket(newSocket);
    setloading(false);
    return () => newSocket.close();
  }, [setsocket]);

  return (
    <AuthProvider>
      {loading ? null : (
        <div className='app'>
          <GameBoard socket={socket} />
          <Chat socket={socket} />
        </div>
      )}
    </AuthProvider>
  );
}

export default App;
