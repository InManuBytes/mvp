import React from 'react';
import html2canvas from 'html2canvas';

const promiseToBlob = (canvas) => {
  return new Promise((res) => {
    canvas.toBlob((blob) => {
      res(blob)
    })
  })
}

const makeHaikuCard = () => {
  if(screen.width < 1024) {
    document.getElementById("viewport").setAttribute("content", "width=1200px");
  }
  const card = document.getElementById('haiku-card');
  let options = {
    removeContainer: true,
    imageTimeout: 15000,
    loggin: false,
    useCORS: true
  };
  return html2canvas(card, options)
    .then((canvas) => promiseToBlob(canvas))
    .then(imageBlob => {
      if(screen.width < 1024) {
        document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1");
      }
      return imageBlob;
    })
    .catch(err => console.log('html2canvas error ', err))
}

export default makeHaikuCard;
