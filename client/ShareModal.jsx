import React from 'react';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { close } = this.props
    close()
  }

  render() {
    const { show } = this.props;
    if (!show) {
      return null;
    }
    return (
      <div class="ui active modal">
        <i class="close icon" onClick={this.closeModal}></i>
        <div class="header">
          Modal Title
        </div>
        <div class="image content">
          <div class="image">
            An image can appear on left or an icon
          </div>
          <div class="description">
            A description can appear on the right
          </div>
        </div>
        <div class="actions">
          <div class="ui button">Cancel</div>
          <div class="ui button">OK</div>
        </div>
      </div>
    );
  }
}



export default ShareModal;
