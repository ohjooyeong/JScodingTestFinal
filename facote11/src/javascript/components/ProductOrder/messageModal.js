import { Component } from "../../core/index.js";

class MessageModal extends Component {
  render() {
    const messageModal = document.createElement("div");
    messageModal.setAttribute("class", "message-modal");
    const messageWrap = document.createElement("div");
    messageWrap.setAttribute("class", "modal-wrap");
    if (this.props.childrenEl) {
      messageWrap.append(...this.props.childrenEl);
    }
    messageModal.append(messageWrap);

    return messageModal;
  }
}

export default MessageModal;
