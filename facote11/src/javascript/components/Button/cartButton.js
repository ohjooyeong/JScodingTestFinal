import { Component } from "../../core/index.js";

class CartButton extends Component {
  render() {
    const cartButton = document.createElement("button");
    cartButton.type = "button";
    cartButton.setAttribute("class", "m-button-fff add-cart");

    const ir = document.createElement("span");
    ir.setAttribute("class", "ir");
    ir.innerText = "장바구니 추가 버튼";
    cartButton.append(ir);

    if (this.props.disabled) {
      cartButton.classList.add("sold-out");
    }

    return cartButton;
  }
}

export default CartButton;
