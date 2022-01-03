import './App.css';

import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import io from 'socket.io-client';

import GameBoard from './Components/GameBoard';
import Chat from './Components/Chat';
import {
  generatePlayerName,
  getPlayerId,
  getPlayerName,
  setPlayerId,
  setPlayerName,
} from './Utils/Player';

const setup = () => {
  if (!getPlayerId()) {
    setPlayerId(uuid());
  }
  if (!getPlayerName()) {
    setPlayerName(generatePlayerName());
  }
};
const cleanup = () => {};

function App() {
  const [socket, setsocket] = useState();
  const [loading, setloading] = useState(0);

  useEffect(() => {
    setup();
    setloading(1);
    return () => {
      cleanup();
    };
  }, []);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setsocket(newSocket);
    console.log('qwe New socket');
    setloading(2);
    return () => newSocket.close();
  }, [setsocket]);

  return loading === 2 ? (
    <div className='app'>
      <GameBoard socket={socket} />
      <Chat socket={socket} />
    </div>
  ) : null;
}

export default App;
