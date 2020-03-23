import React from 'react';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { show } = this.props;
    if (!show) {
      return null;
    }
    return <div>
      Hello Modal
    </div>
  }
}



export default ShareModal;
