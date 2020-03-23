import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Server from './server';
import makeHaikuCard from './Share';
import 'fomantic-ui-less/semantic.less';

ReactDOM.render(<App server={Server} makeHaikuCard={makeHaikuCard} />, document.getElementById('app'));