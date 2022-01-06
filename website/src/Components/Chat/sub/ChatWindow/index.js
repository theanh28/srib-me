import './index.scss';

import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getPlayerToken, getPlayerName } from '../../../../Utils/Player';

const ChatWindow = ({ onSubmit }) => {
  const [text, settext] = useState('');

  const onTextChange = (e) => {
    const value = e.target.value;
    settext(value);
  };
  const onTextSubmit = (e) => {
    e.preventDefault();
    const value = e.target[0].value.trim();
    if (!value) return;
    const playerName = getPlayerName();
    const playerToken = getPlayerToken();
    onSubmit({ playerName, playerToken, value });
    settext('');
  };

  useEffect(() => {
    const keyDownFunc = (e) => {
      if (e.code === 'Enter') {
        if (!e.shiftKey) {
          // https://stackoverflow.com/questions/37901223/react-js-submit-form-programmatically-does-not-trigger-onsubmit-event
          // scorll downnnnnnnnnn...
          document.querySelector('#chat-form').dispatchEvent(
            new Event('submit', { cancelable: true, bubbles: true })
          );
          e.preventDefault();
        }
      }
    };
    const textArea = document.querySelector('#chat-tarea');
    textArea.addEventListener('keydown', keyDownFunc, false);
    return () => {
      textArea.removeEventListener('keydown', keyDownFunc, false);
    };
  }, []);
  
  useEffect(() => {
    const textArea = document.querySelector('#chat-tarea');
    if (textArea.scrollHeight < 120) { // so-so :))
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
  }, [text])

  return (
    <div className='chat-window'>
      <form
        onSubmit={onTextSubmit}
        className='chat-form'
        id='chat-form'
      >
        <textarea
          id='chat-tarea'
          type='text'
          placeholder={'Aa'}
          value={text}
          onChange={onTextChange}
          className='chat-enter small-text'
        ></textarea>
      </form>
      <IconButton variant='contained' type='submit' form='chat-form'>
        <SendIcon />
      </IconButton>
    </div>
  );
};

export default ChatWindow;
