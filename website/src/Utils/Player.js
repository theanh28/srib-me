import { name1, name2 } from './Names';

const getPlayerName = () => {
  const value = localStorage.getItem('playerName');
  if (!value) {
    return "";
  }
  return value;
};

const setPlayerName = (value) => {
  localStorage.setItem('playerName', value);
};

const getPlayerId = () => {
  const value = localStorage.getItem('playerId');
  return value;
};

const setPlayerId = (value) => {
  localStorage.setItem('playerId', value);
};

function generatePlayerName() {
  const capFirst = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  const name =
    capFirst(name1[getRandomInt(0, name1.length + 1)]) +
    ' ' +
    capFirst(name2[getRandomInt(0, name2.length + 1)]);
  return name;
}

export {
  getPlayerName,
  setPlayerName,
  getPlayerId,
  setPlayerId,
  generatePlayerName,
};
