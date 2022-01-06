import './index.scss';

import React, { useState, useEffect, useCallback } from 'react';

import Messages from './sub/Messages';
import ChatWindow from './sub/ChatWindow';

const Chat = ({ socket }) => {
  const [messages, setmessages] = useState([]);

  const handleSubmitMessage = ({ playerName, playerToken, value }) => {
    socket.emit('addMessage', { playerName, playerToken, value });
  };

  const addMessage = ({ playerName, playerToken, value }) => {
    setmessages((prevMsg) => {
      const newMsg = [...prevMsg];
      newMsg.push({ playerName, playerToken, value });
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
