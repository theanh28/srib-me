import './index.scss';

import React, { useState, useEffect, useCallback } from 'react';
import Messages from './sub/Messages';
import ChatWindow from './sub/ChatWindow';

const Chat = ({ socket }) => {
  const [messages, setmessages] = useState([]);

  const handleSubmitMessage = ({ playerName, playerId, value }) => {
    socket.emit('addMessage', { playerName, playerId, value });
  };

  const addMessage = ({ playerName, playerId, value }) => {
    setmessages((prevMsg) => {
      const newMsg = [...prevMsg];
      newMsg.push({ playerName, playerId, value });
      return newMsg;
    });
  };

  useEffect(() => {
    socket.on('newMessage', addMessage);
    return () => {
      socket.off('newMessage', addMessage);
    };
  }, [socket]);

  return (
    <div className='chat-ctn'>
      <Messages messages={messages} />
      <ChatWindow onSubmit={handleSubmitMessage} />
    </div>
  );
};

export default Chat;
