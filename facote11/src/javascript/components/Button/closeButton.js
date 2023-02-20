import { Component } from "../../core/index.js";

class CloseButton extends Component {
  render() {
    const closeButton = document.createElement("button");
    closeButton.setAttribute("class", "icon-delete close-btn");
    closeButton.type = "button";

    const buttonIr = document.createElement("span");
    buttonIr.setAttribute("class", "ir");
    closeButton.append(buttonIr);

    return closeButton;
  }
}

export default CloseButton;
