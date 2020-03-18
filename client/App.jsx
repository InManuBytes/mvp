import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <div className="ui middle aligned centered grid">
            <div className="row">
              <div className="twelve wide column">
                <h1 className="ui icon header">
                  <i className="crow icon"></i>
                  <div className="content">
                    Tweet-Ku
                    <div className="sub header">Tweet-powered haiku generator</div>
                  </div>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <div className="ui search">
                  <div className="ui left icon input" data-tooltip="Enter a user's Twitter handle to begin">
                    <i className="at icon" />
                    <input className="prompt" type="text" placeholder="Twitter Handle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="twelve wide column">
                <button className="large ui button">
                  <i className="feather icon"></i>
                  Compose a Tweet-Ku
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui fluid raised card">
          <div className="content">
            <div className="ui grey inverted basic segment">
              <div className="ui left floated">
                <i className="quote left icon" />
              </div>
              <div className="center aligned description">
                <p>
                  The apparition of these faces in the crowd:
                  Petals on a wet, black bough.
                  <div className="ui right floated">
                    <i className="quote right icon" />
                  </div>
                </p>
              </div>
            </div>
            <div className="extra content">
              <div className="right aligned author">
                <i className="ui crow icon" />
                Ezra Pound
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
