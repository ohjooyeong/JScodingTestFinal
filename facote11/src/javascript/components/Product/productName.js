import { Component } from "../../core/index.js";

class ProductName extends Component {
  // 추상화를 거치면 없어도 되는데 일단 해놓겠음
  constructor(props) {
    super(props);
  }
  render() {
    const productName = document.createElement("strong");
    productName.setAttribute("class", "product-name sl-ellipsis");
    productName.innerText = this.props.name;
    return productName;
  }
}

export default ProductName;
