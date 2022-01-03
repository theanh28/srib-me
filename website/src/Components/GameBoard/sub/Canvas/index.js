import './index.scss';

import React, { useEffect, useState, useCallback } from 'react';

const Canvas = ({socket}) => {
  const [lineWidth, setlineWidth] = useState(1);
  const [lineColor, setlineColor] = useState('black');
  let anchor = null;

  const drawOnCanvas = () => {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      'mousemove',
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor;
    canvas.addEventListener(
      'mousedown',
      function (e) {
        canvas.addEventListener('mousemove', onPaint, false);
        onPaint(); // click = paint dot
      },
      false
    );

    canvas.addEventListener(
      'mouseup',
      function () {
        canvas.removeEventListener('mousemove', onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();
      
      if (anchor) clearTimeout(anchor);
      anchor = setTimeout(() => {
        socket.emit("addCanvas", canvas.toDataURL());
        console.log("qwe emitted");
      }, 1000);
    };
  };

  const addCanvas = (base64Img) => {
    console.log('qwe base64', base64Img);
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    }
    image.src = base64Img;
  }

  useEffect(() => {
    drawOnCanvas();
  }, []);

  useEffect(() => {
    socket.on('newCanvas', addCanvas);
    return () => {
      socket.off('newCanvas', addCanvas);
    };
  }, [socket])

  return (
    <div id='sketch' className='sketch'>
      <canvas id='paint' className='canvas'></canvas>
    </div>
  );
};

export default Canvas;
