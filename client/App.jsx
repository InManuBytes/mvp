import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className="ui segment">
        <div className="ui middle aligned two column centered grid">
          <div className="row">
            <div className="column">
              <h1 className="ui icon header">
                <i className="crow icon"></i>
                <div className="content">
                  Tweet-Ku
                  <div className="sub header">Tweet-powered haiku generator</div>
                </div>
              </h1>
            </div>
          </div>
          <div className="column">
            <div className="ui search">
              <div className="ui icon input">
                <input class="prompt" type="text" placeholder="Twitter handle" />
                <i class="feather icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
