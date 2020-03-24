import React from 'react';
import HaikuLoadingIndicator from './Loading';

const Input = ({inputChange, getTweets, composeText }) => (
  <div className="column">
    {/* user input */}
    <div className="row">
      <div className="ui basic center aligned segment">
        <div className="ui search">
          <div className="ui left icon input focus" data-tooltip="Enter a public Twitter handle to begin">
            <i className="at icon" />
            <input className="prompt" type="text" placeholder="Twitter Handle" onChange={inputChange} />
          </div>
        </div>
      </div>
    </div>
    {/* Generate haiku button or loading while generating tweets */}
    <div className="row">
      <div className="ui basic center aligned segment">
        {/* Button or Loading */}
        <HaikuLoadingIndicator onClick={getTweets} area='compose-button' loadingText={composeText} buttonText="Compose haiku" buttonClass="ui large button" iconClass="feather icon" />
      </div>
    </div>
  </div>
);

export default Input;
