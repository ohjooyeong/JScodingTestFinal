import { Component, createComponent } from "../../core/index.js";
import { OptionSelector, QuantityInput, SelectedOption } from "./index.js";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      quantity: this.props.product.option.length > 0 ? 0 : 1,
      selectedProductOptions: [],
    };
  }

  addSelectedProductOption(optionId) {
    const isExist =
      this.state.selectedProductOptions.filter(
        (selectedProduct) => selectedProduct.optionId === optionId
      ).length > 0;
    if (isExist) return;

    const newSelectedProductOption = {
      optionId: optionId,
      quantity: 1,
    };
    const newSelectedProductOptions = this.state.selectedProductOptions;
    newSelectedProductOptions.push(newSelectedProductOption);
    const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions: newSelectedProductOptions,
    });
  }

  removeSelectedProductOption(optionId) {
    const newSelectedProductOptions = this.state.selectedProductOptions.filter(
      (selectedProductOption) => {
        return selectedProductOption.optionId !== optionId;
      }
    );
    const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);

    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions: newSelectedProductOptions,
    });
  }

  getTotalQuantity(newSelectedProductOptions) {
    const newTotalQuantity = newSelectedProductOptions.reduce(
      (acc, selectedProductOption) => {
        return acc + selectedProductOption.quantity;
      },
      0
    );
    return newTotalQuantity;
  }

  setOptionQunatity(optionId, newQuantity) {
    const newSelectedProductOptions = this.state.selectedProductOptions.map(
      (selectedOption) => {
        if (newQuantity < 1) {
          return selectedOption;
        }
        if (optionId === selectedOption.optionId) {
          return { ...selectedOption, quantity: newQuantity };
        } else {
          return selectedOption;
        }
      }
    );
    const newTotalQuantity = this.getTotalQuantity(newSelectedProductOptions);
    this.setState({
      ...this.state,
      quantity: newTotalQuantity,
      selectedProductOptions: newSelectedProductOptions,
    });
  }

  setTotalQuantity(newQuantity) {
    const maxQuantity = this.props.product.stockCount;
    const minQuantity = 1;
    if (newQuantity > maxQuantity) {
      this.setState({ ...this.state, quantity: maxQuantity });
    } else if (newQuantity < minQuantity) {
      this.setState({ ...this.state, quantity: 1 });
    } else {
      this.setState({ ...this.state, quantity: newQuantity });
    }
  }

  getTotalPrice() {
    const product = this.props.product;
    const totalPrice =
      product.price * 0.01 * (100 - product.discountRate) * this.state.quantity;

    const totalAdditionalFee = this.state.selectedProductOptions.reduce(
      (acc, selectedProductOption) => {
        const optionIdx = product.option.findIndex(
          (option) => option.id === selectedProductOption.optionId
        );
        acc +=
          selectedProductOption.quantity *
          product.option[optionIdx].additionalFee;
        return acc;
      },
      0
    );
    return totalPrice + totalAdditionalFee;
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
    if (this.props.product.option.length > 0) {
      // 옵션이 있을 때 나오는 부분
      // 옵션을 선택했을 때 선택한 옵션이 생겨야 된다.
      const optionSelector = createComponent(OptionSelector, {
        option: this.props.product.option,
        addSelectedProductOption: this.addSelectedProductOption.bind(this),
      });
      const selectedProductOptionList = document.createElement("ul");
      this.state.selectedProductOptions.forEach((selectedProductOption) => {
        const selectedOption = this.props.product.option.find(
          (option) => option.id === selectedProductOption.optionId
        );
        const optionName = selectedOption.optionName;
        const productPrice =
          this.props.product.price *
          (1 - this.props.product.discountRate * 0.01);
        const optionPrice = productPrice + selectedOption.additionalFee;

        const quantityInput = createComponent(QuantityInput, {
          ...this.props,
          quantity: selectedProductOption.quantity,
          setQuantity: this.setOptionQunatity.bind(
            this,
            selectedProductOption.optionId
          ),
        });
        const selectedProductOptionItem = createComponent(SelectedOption, {
          optionName: optionName,
          optionPrice: optionPrice,
          quantityInput: quantityInput,
          removeSelectedProductOption: this.removeSelectedProductOption.bind(
            this,
            selectedProductOption.optionId
          ),
        });
        selectedProductOptionList.append(selectedProductOptionItem);
      });
      selectedProductContainer.append(
        optionSelector,
        selectedProductOptionList
      );
    } else {
      // 옵션이 없을 때
      const quantityInput = createComponent(QuantityInput, {
        ...this.props,
        quantity: this.state.quantity,
        setQuantity: this.setTotalQuantity.bind(this), // 함수의 실행 주체가 quantityIncreaseButton으로 되니 에러가 뜸 그래서 this를 바인드해준다
      });
      selectedProductContainer.append(quantityInput);
    }

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

    productQuantity.append("총 수량 ", productQuantityNum, "개");

    const totalPrice = document.createElement("strong");
    totalPrice.setAttribute("class", "price l-price");
    const totalProductPrice = this.getTotalPrice();
    totalPrice.innerText = totalProductPrice.toLocaleString("ko-Kr");

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
