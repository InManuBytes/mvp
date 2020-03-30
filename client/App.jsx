import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import HaikuLoadingIndicator from './Loading';
import ShareModal from './ShareModal';
import Menu from './Menu';
import Input from './Input';
import About from './About';
import { animateScroll as scroll, Element } from 'react-scroll';

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
      pages: ['Home', 'About'],
      activePage: 'Home',
      error: ''
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
          let latestHaiku = haikuData.haiku;
          let author = haikuData.user;
          let error = '';
          if (haikuData.code === 404) {
            latestHaiku = [`${haikuData.code} ERROR:`, haikuData.message];
            error = haikuData.code;
            author = 'ERROR';
          }
          scroll.scrollToBottom();
          this.setState({ haiku: latestHaiku, showHaiku: true, author: author, clickedShare: 0, error });
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
          return server.postHaiku(imageBlob, haiku, author)
        })
        .then(postData => {
          const cardURL = postData.entities.media[0].url;
          this.showShareModal(cardURL);
        })
        .catch(err => console.log(err)),'share-button');
    } else {
      this.showShareModal(cardURL);
    }
  }

  showShareModal(cardURL) {
    const { clickedShare } = this.state;
    this.setState({ showShareModal: true, cardURL, clickedShare: clickedShare + 1 })
  }

  closeShareModal() {
    this.setState({ showShareModal: false })
  }

  renderHaiku() {
    const { haiku, author, showShareModal, cardURL, shareText, error } = this.state;
    return (
      <Element name="haiku-card" className="ui basic segment" style={{ width: '400px'}}>
        {/* haiku card */}
        <div className="ui fluid raised card" id="haiku-card">
          <div className="content">
            <img className="ui avatar image" src="/images/icons/crow_black.png" />Tweet-ku
            {/* haiku */}
            <div className="ui grey inverted basic segment" style={{ marginTop: '0px' }}>
              <div className="center aligned description">
                <div className="ui list" style={{ fontSize: '1.5rem' }}>
                  <div className="ui left floated">
                    <i className="quote left icon" />
                  </div>
                  {haiku ? haiku.map((line, idx) => {
                    return <div key={idx} className="item">{line}</div>
                  }) : null}
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
                @{author}
              </div>
            </div>
          </div>
          <ShareModal show={showShareModal} url={cardURL} close={this.closeShareModal} author={author} />
        </div>
        {showShareModal ? null :
          <HaikuLoadingIndicator onClick={this.postHaiku} area="share-button" loadingText={shareText} buttonText="Share" buttonClass="ui fluid white button" iconClass="share square icon" />
        }
      </Element>
    );
  }

  changePage(page) {
    this.setState({ activePage: page });
  }

  renderActivePage() {
    const { composeText, activePage, haiku, error } = this.state;
    if (activePage === 'Home') {
      return <Input inputChange={this.onInputChange} getTweets={this.getTweets} composeText={composeText} error={error} message={haiku[1]} />
    } else if (activePage === 'About') {
      return <About />
    }
  }

  render() {
    const { showHaiku, cardURL, pages, activePage, error } = this.state;
    return (
      <div className="ui fluid container">
        {/* Layout TODO refactor*/}
          <div className="ui basic segment">
            <Menu pages={pages} active={activePage} onClick={this.changePage} />
            <div className="ui two column stackable grid">
              {/* Title header */}
              <div className="column">
                <div className="ui basic center aligned segment">
                  <img className="ui small circular centered image" src="/images/icons/crow_white.png" />
                  <h1 className="ui header">
                    <div className="content">
                      Tweet-Ku
                      <i className="creative commons icon"></i>
                      <div className="sub header">Tweet-powered AI haiku generator</div>
                    </div>
                  </h1>
                </div>
                {this.renderActivePage()}
              </div>
              {/* Generated haiku only generate if there is data to generate */}
              {(showHaiku && !error) ? this.renderHaiku() : null}
            </div>
          </div>
      </div>
    );
  }
}

export default App;
