import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const HaikuLoadingIndicator = ({ onClick, area, loadingText, buttonText, buttonClass, iconClass }) => {
  const { promiseInProgress } = usePromiseTracker({area: area});
  if (promiseInProgress) {
    return (
    <div className="ui active centered inline text slow loader">{loadingText}</div>
    );
  }
  return (
    <button className={buttonClass} onClick={onClick}>
      <i className={iconClass}></i>
      {buttonText}
    </button>
  );
}

export default HaikuLoadingIndicator;
