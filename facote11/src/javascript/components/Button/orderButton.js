import { Component } from "../../core/index.js";

class OrderButton extends Component {
  render() {
    const orderButton = document.createElement("button");
    orderButton.type = "button";
    orderButton.setAttribute("class", "m-button-fill order-button");
    if (this.props.disabled) {
      orderButton.classList.add("sold-out");
    }

    orderButton.innerText = this.props.text;

    return orderButton;
  }
}

export default OrderButton;
