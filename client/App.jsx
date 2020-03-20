import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterHandle: '',
      haiku: []
    };
    this.onChange = this.onChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
  }

  onChange(e) {
    this.setState({ twitterHandle: event.target.value })
  }

  getTweets() {
    const { twitterHandle } = this.state;
    const { server } = this.props;
    return server.getHaiku(twitterHandle)
      .then(haikuData => {
        const latestHaiku = haikuData[0].haikus[0].text;
        this.setState({ haiku: latestHaiku });
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    return (
      <div className="ui middle aligned one column centered grid" style={{ height: '100vh' }}>
        {/* user interaction */}
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui segment">
            <div className="ui one column centered grid">
              {/* Title header */}
              <div className="column">
                <div className="ui basic center aligned segment">
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
                {/* user input */}
                <div className="row">
                  <div className="ui basic center aligned segment">
                    <div className="ui search">
                      <div className="ui left icon input focus" data-tooltip="Enter a user's Twitter handle to begin">
                        <i className="at icon" />
                        <input className="prompt" type="text" placeholder="Twitter Handle" onChange={this.onChange} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Generate haiku button */}
                <div className="row">
                  <div className="ui basic center aligned segment">
                    <button className="ui large button" onClick={this.getTweets}>
                      <i className="feather icon"></i>
                      Compose haiku
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Generated haku */}
        <div className="column" style={{ maxWidth: 450 }}>
          {/* haiku card */}
          <div className="ui fluid raised card">
            <div className="content">
              {/* haiku */}
              <div className="ui grey inverted basic segment">
                <div className="center aligned description">
                  <div className="ui left floated">
                    <i className="quote left icon" />
                  </div>
                    <div className="ui list">
                      <div className="item">The apparition of these faces in the crowd:</div>
                      <div className="item">Petals on a wet,</div>
                      <div className="item">black bough.</div>
                    </div>
                  <div className="ui right floated">
                    <i className="quote right icon" />
                  </div>
                </div>
              </div>
              {/* author */}
              <div className="extra content">
                <div className="right aligned author">
                  <i className="ui crow icon" />
                  Ezra Pound
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
