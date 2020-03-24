import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import HaikuLoadingIndicator from './Loading';
import ShareModal from './ShareModal';
import Menu from './Menu';
import Input from './Input';
import About from './About';

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
      clickedShare: 0,
      composeText: 'Contacting the muses',
      shareText: 'Testing your zen',
      pages: [
        {
          name: 'Home',
          active: true
        },
        {
          name: 'About',
          active: false
        }
      ],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.getTweets = this.getTweets.bind(this);
    this.renderHaiku = this.renderHaiku.bind(this);
    this.postHaiku = this.postHaiku.bind(this);
    this.showShareModal = this.showShareModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  onInputChange(e) {
    this.setState({ twitterHandle: event.target.value })
  }

  getTweets() {
    const { twitterHandle, clickedShare } = this.state;
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
          this.setState({ haiku: latestHaiku, showHaiku: true, author: author, clickedShare: 0 });
        })
        .catch(err => console.log(err)),'compose-button');
  }

  postHaiku() {
    const { server, makeHaikuCard } = this.props;
    const { haiku, author, clickedShare, cardURL } = this.state;
    if (!clickedShare) {
      trackPromise(
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
        .catch(err => console.log(err)),'share-button');
    } else {
      this.showShareModal(cardURL);
    }
  }

  showShareModal(cardURL) {
    console.log('rendering modal for: ', cardURL)
    const { clickedShare } = this.state;
    this.setState({ showShareModal: true, cardURL, clickedShare: clickedShare + 1 })
  }

  closeShareModal() {
    this.setState({ showShareModal: false })
  }

  renderHaiku() {
    const { haiku, author, showShareModal, cardURL, shareText } = this.state;
    return (
      <div className="column" style={{ maxWidth: 450 }}>
        {/* haiku card */}
        <div className="ui fluid raised card" id="haiku-card">
          {/* TODO refactor */}
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
          <ShareModal show={showShareModal} url={cardURL} close={this.closeShareModal} author={author} />
        </div>
        {showShareModal ? null :
          <HaikuLoadingIndicator onClick={this.postHaiku} area="share-button" loadingText={shareText} buttonText="Share" buttonClass="ui fluid white button" iconClass="share square icon" />
        }
      </div>
    );
  }

  changePage(e) {
    console.log(e.target.key);
  }

  renderActivePage() {
    const { composeText, pages } = this.state;
    const activePage = pages.filter(page => {
      return page.active;
    });
    if (activePage[0].name === 'Home') {
      return <Input inputChange={this.onInputChange} getTweets={this.getTweets} composeText={composeText} />
    } else if (activePage[0].name === 'About') {
      return <About />
    }
  }

  render() {
    const { showHaiku, cardURL, pages } = this.state;
    return (
      <div className="ui middle aligned one column centered grid" style={{ height: '100vh' }}>
        {/* Layout TODO refactor*/}
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui segment">
            <Menu pages={pages} onClick={this.changePage} />
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
              {this.renderActivePage()}
            </div>
          </div>
        </div>
        {/* Generated haiku only generate if there is data to generate */}
        {showHaiku ? this.renderHaiku() : null}
      </div>
    );
  }
}

export default App;
