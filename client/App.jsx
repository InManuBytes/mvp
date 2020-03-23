import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import HaikuLoadingIndicator from './Loading';
import ShareModal from './ShareModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterHandle: '',
      haiku: [],
      showHaiku: false,
      author: '',
      cardURL: '',
      showShareModal: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.renderHaiku = this.renderHaiku.bind(this);
    this.postHaiku = this.postHaiku.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
  }

  onInputChange(e) {
    this.setState({ twitterHandle: event.target.value })
  }

  getTweets() {
    const { twitterHandle } = this.state;
    const { server } = this.props;
    trackPromise(
      server.getHaiku(twitterHandle)
        .then(haikuData => {
          console.log(haikuData);
          let latestHaiku = haikuData.haiku;
          let author = haikuData.user;
          if (haikuData.status === 400) {
            latestHaiku = [`${haikuData.code} ERROR: ${haikuData.statusText}`, haikuData.message];
            author = 'IBM WATSON';
          }
          this.setState({ haiku: latestHaiku, showHaiku: true, author: author });
        })
        .catch(err => console.log(err)));
  }

  postHaiku() {
    const { server, makeHaikuCard } = this.props;
    const { haiku, author } = this.state;
    makeHaikuCard()
      .then(imageBlob => {
        console.log('2. sending haiku data back to server');
        return server.postHaiku(imageBlob, haiku, author)
      })
      .then(postData => {
        const cardURL = postData.entities.media[0].url;
        console.log('Got image url: ', cardURL);
        this.showShareModal(cardURL);
      })
  }

  showShareModal(cardURL) {
    console.log('rendering modal for: ', cardURL)
    this.setState({ showShareModal: true, cardURL})
  }

  renderHaiku() {
    const { haiku, author } = this.state;
    return (
      <div className="column" style={{ maxWidth: 450 }}>
        {/* haiku card */}
        <div className="ui fluid raised card" id="haiku-card">
          <div className="content">
            {/* haiku */}
            <div className="ui grey inverted basic padded segment">
              <div className="center aligned description">
                <div className="ui list" style={{ fontSize: '1.7rem' }}>
                  <div className="ui left floated">
                    <i className="quote left icon" />
                  </div>
                  {haiku.map((line, idx) => {
                    return <div key={idx} className="item">{line}</div>
                  })}
                  <div className="ui right floated">
                    <i className="quote right icon" />
                  </div>
                  {/* not sure how else to fix the bottom of the right quote touching the bottom of the segment */}
                  <div className="item"></div>
                </div>
              </div>
            </div>
            {/* author */}
            <div className="extra content">
              <div className="right aligned author">
                <i className="ui crow icon" />
                {author}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { showHaiku, showShareModal, cardURL } = this.state;
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
                      <div className="sub header">Tweet-powered AI haiku generator</div>
                    </div>
                  </h1>
                </div>
              </div>
              <div className="column">
                {/* user input */}
                <div className="row">
                  <div className="ui basic center aligned segment">
                    <div className="ui search">
                      <div className="ui left icon input focus" data-tooltip="Enter a public Twitter handle to begin">
                        <i className="at icon" />
                        <input className="prompt" type="text" placeholder="Twitter Handle" onChange={this.onInputChange} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Generate haiku button or loading while generating tweets */}
                <div className="row">
                  <div className="ui basic center aligned segment">
                    {/* Button or Loading */}
                    <HaikuLoadingIndicator onClick={this.getTweets} />
                  </div>
                </div>
              </div>
            </div>
            <ShareModal show={showShareModal} url={cardURL} />
            <button className="ui fluid blue basic button" onClick={this.postHaiku}>
              <i className="share square icon"></i>
              Share
            </button>
          </div>
        </div>
        {/* Generated haku only generate if there is data to generate */}
        {showHaiku ? this.renderHaiku() : null}
      </div>
    );
  }
}

export default App;
