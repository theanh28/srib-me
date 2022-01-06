import './index.scss';

import React, { useState, useEffect } from 'react';
import {
  getPlayerToken,
  getPlayerName,
  setPlayerName,
} from '../../../../Utils/Player';
import EditIcon from '@mui/icons-material/Edit';

const MessageBlock = ({ playerName, playerToken, value }, id) => {
  return (
    <div className='msg-block' key={`chat-message-${id}`}>
      <div className='player-name small-text'>{playerName}</div>
      <div
        className={`msg-text small-text ${
          playerToken === getPlayerToken() ? 'author' : null
        }`}
      >
        {value}
      </div>
    </div>
  );
};

const NameBar = ({ value }) => {
  const [name, setname] = useState(value);
  const [isChanging, setisChanging] = useState();

  useEffect(() => {
    const nameKeyFunc = (e) => {
      if (e.keyCode === 27) {
        setname(getPlayerName());
        setisChanging(false);
      }
    };
    const nameInput = document.querySelector('#player-name-input');
    nameInput.addEventListener('keydown', nameKeyFunc, false);
    nameInput.focus();

    return () => {
      nameInput.removeEventListener('keydown', nameKeyFunc, false);
    };
  }, [isChanging]);
  const showNameChange = () => {
    setisChanging(true);
  };
  const handleChangeName = (e) => {
    const value = e.target.value;
    setname(value);
  };
  const handleSubmitName = (e) => {
    e.preventDefault();
    const value = e.target[0].value.trim();
    if (!value) return;
    setPlayerName(value);
    setname(value);
    setisChanging(false);
  };
  return (
    <div className='name-bar'>
      <div
        className={`d-flex justify-content-start ${
          isChanging ? 'd-none' : null
        }`}
        onClick={showNameChange}
      >
        <div className='small-text player-name'>{name}</div>
        <EditIcon className='edit-icon' />
      </div>
      <form
        onSubmit={handleSubmitName}
        className={`${!isChanging ? 'd-none' : null}`}
      >
        <input
          autoFocus
          id='player-name-input'
          type='text'
          className='small-text player-name'
          value={name}
          onChange={handleChangeName}
        ></input>
      </form>
    </div>
  );
};

const MessageContainer = ({ messages }) => {
  return (
    <div className='msg-ctn'>
      <div className='msg-flow'>
        {messages.map((datum, id) => MessageBlock(datum, id))}
      </div>
      <NameBar value={getPlayerName()} />
    </div>
  );
};

export default MessageContainer;
