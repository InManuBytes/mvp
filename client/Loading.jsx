import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div className="ui active centered inline text slow loader">Contacting the muses</div>
  );
}

export default LoadingIndicator;
