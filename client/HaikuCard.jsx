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
  const card = document.getElementById('haiku-card');
  return html2canvas(card)
    .then((canvas) => promiseToBlob(canvas))
    .then(imageBlob => imageBlob)
    .catch(err => console.log('html2canvas error ', err))
}

export default makeHaikuCard;
