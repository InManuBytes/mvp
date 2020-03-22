import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const HaikuLoadingIndicator = ({ onClick }) => {
  const { promiseInProgress } = usePromiseTracker();
  if (promiseInProgress) {
    return (
      <div className="ui active centered inline text slow loader">Contacting the muses</div>
    );
  }
  return (
    <button className="ui large button" onClick={onClick}>
      <i className="feather icon"></i>
      Compose haiku
    </button>
  );
}

export default HaikuLoadingIndicator;
