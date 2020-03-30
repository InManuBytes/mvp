import React from 'react';
import { TwitterButton } from "react-social";

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: '#haiku',
      title: 'Latest tweet-ku from'
    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { close } = this.props
    close()
  }

  render() {
    const { show, url, author } = this.props;
    const { hashtag, title } = this.state;
    const text = `${title} @${author} ${hashtag}`;
    if (!show) {
      return null;
    }
    return (
      <div className="ui active dimmer">
        <div className="content">
          <div className="ui container">
          <i className="large times circle outline icon" onClick={this.closeModal} />
          </div>
          <p></p>
          <p>
            <TwitterButton url={url} message={text} className="ui twitter button">
              <i className="twitter icon"></i>
              Twitter
            </TwitterButton>
          </p>
        </div>
      </div>
    );
  }
}



export default ShareModal;
