import "./index.scss";

import React from 'react';
import Canvas from './sub/Canvas';

const GameBoard = ({socket}) => {


  return (
    <div className="paper">
      <Canvas socket={socket}/>
      {/** Add game functions below board here */}
    </div>
  )
}

export default GameBoard;