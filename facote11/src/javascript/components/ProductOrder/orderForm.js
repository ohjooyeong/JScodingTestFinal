import { Component, createComponent } from "../../core/index.js";
import { QuantityInput } from "./index.js";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  increaseQuantity() {
    const newQuantity = this.state.quantity + 1;
    if (newQuantity > this.props.product.stockCount) return;
    this.setState({ quantity: newQuantity });
  }

  decreaseQuantity() {
    const newQuantity = this.state.quantity - 1;
    if (newQuantity < 1) return;
    this.setState({ quantity: newQuantity });
  }
  onChangeQuantityInput(e) {
    const maxQuantity = this.props.product.stockCount;
    const newQuantity = e.target.value;
    if (newQuantity > maxQuantity) {
      this.setState({ quantity: maxQuantity });
    } else if (newQuantity < 1) {
      this.setState({ quantity: 1 });
    } else {
      this.setState({ quantity: newQuantity });
    }
  }

  render() {
    const orderForm = document.createElement("form");
    orderForm.setAttribute("class", "product-order-form");

    const productOptionContainer = document.createElement("div");
    productOptionContainer.setAttribute("class", "product-option");

    const deliveryTitle = document.createElement("span");
    deliveryTitle.setAttribute("class", "delivery-title");
    deliveryTitle.innerText = `택배 배송 / ${
      this.props.product.shippingFee > 0
        ? this.props.product.shippingFee.toLocaleString("ko-Kr") + "원"
        : "무료 배송"
    }`;

    const selectedProductContainer = document.createElement("div");
    selectedProductContainer.setAttribute("class", "selected-product");

    const quantityInput = createComponent(QuantityInput, {
      ...this.props,
      quantity: this.state.quantity,
      increaseQuantity: this.increaseQuantity.bind(this), // 함수의 실행 주체가 quantityIncreaseButton으로 되니 에러가 뜸 그래서 this를 바인드해준다
      decreaseQuantity: this.decreaseQuantity.bind(this),
      onChangeQuantityInput: this.onChangeQuantityInput.bind(this),
    });
    selectedProductContainer.append(quantityInput);

    const totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("class", "total-price");

    const totalPriceTitle = document.createElement("span");
    totalPriceTitle.setAttribute("class", "title");
    totalPriceTitle.innerText = "총 상품금액";

    const totalOrderInfo = document.createElement("div");
    totalOrderInfo.setAttribute("class", "total-order-info");

    const productQuantity = document.createElement("strong");
    // quantityInput 기능 구현되면서 같이 반영하기
    productQuantity.setAttribute("class", "quantity");

    const productQuantityNum = document.createElement("span");
    productQuantityNum.innerText = this.state.quantity.toLocaleString("ko-Kr");

    productQuantity.append(
      "총 수량 ",
      productQuantityNum.toLocaleString("ko-Kr"),
      "개"
    );

    const totalPrice = document.createElement("strong");
    totalPrice.setAttribute("class", "price l-price");
    totalPrice.innerText = (
      this.props.product.price * this.state.quantity
    ).toLocaleString("ko-Kr");

    const priceType = document.createElement("span");
    priceType.innerText = "원";
    totalPrice.append(priceType);

    totalOrderInfo.append(productQuantity, totalPrice);

    totalPriceContainer.append(totalPriceTitle, totalOrderInfo);

    productOptionContainer.append(
      deliveryTitle,
      selectedProductContainer,
      totalPriceContainer
    );
    orderForm.append(productOptionContainer);

    return orderForm;
  }
}

export default OrderForm;
