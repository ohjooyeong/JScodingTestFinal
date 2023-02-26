import { Component, createComponent } from "../../../core/index.js";
import {
  ProductImage,
  ProductName,
  ProductPrice,
} from "../../Product/index.js";

class OrderProductItem extends Component {
  // 렌더링
  render() {
    const orderItem = document.createElement("tr");
    orderItem.setAttribute("class", "order-item");

    // 상품 선택 체크박스
    const checkBox = document.createElement("td");
    checkBox.setAttribute("class", "checkbox");

    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.setAttribute(
      "class",
      `select-button ${this.props.isSelected ? "on" : ""}`
    );

    const spanInButton = document.createElement("span");
    spanInButton.setAttribute("class", "ir");
    spanInButton.innerText = "선택";

    selectButton.append(spanInButton);

    selectButton.addEventListener("click", () => {
      this.props.changeSelectedProducts(this.props.product.id);
    });

    checkBox.append(selectButton);

    // 상품 정보
    const productInfo = document.createElement("td");
    productInfo.setAttribute("class", "product-info");

    const productImage = createComponent(ProductImage, {
      src: this.props.product.thumbnailImg,
    });

    const productInfoDiv = document.createElement("div");
    productInfoDiv.setAttribute("class", "display-right");

    const productName = createComponent(ProductName, {
      name: this.props.product.productName,
    });
    productName.classList.add("sl-ellipsis");

    const productPrice = createComponent(ProductPrice, {
      price: this.props.product.price,
      discountRate: this.props.product.discountRate,
    });

    const orderText = document.createElement("p");
    orderText.innerText =
      this.props.product.option.length === 0
        ? `수량 : ${this.props.product.quantity}개`
        : this.props.product.option
            .map(
              (option) =>
                `옵션 : ${option.optionName}(수량 : ${option.quantity}개)`
            )
            .join(" / ");

    productInfoDiv.append(productName, productPrice, orderText);
    productInfo.append(productImage, productInfoDiv);

    // 쿠폰 할인
    const discountByCoupon = document.createElement("td");
    discountByCoupon.setAttribute("class", "discount-coupon");

    const couponName = document.createElement("strong");
    couponName.setAttribute("class", "name sl-ellipsis");

    const couponPrice = document.createElement("strong");
    couponPrice.setAttribute("class", "price");

    Object.keys(this.discountCoupon).length !== 0
      ? ((couponName.innerText = this.discountCoupon["couponName"]),
        (couponPrice.innerText = `-${priceFormatToKRW(
          this.discountCoupon["discount"]
        )}원`))
      : ((couponName.innerText = "-"), (couponPrice.innerText = "-"));

    discountByCoupon.append(couponName, couponPrice);

    // 배송비
    const shippingFee = document.createElement("td");
    shippingFee.setAttribute("class", "shipping-fee");

    // 주문금액
    const totalPrice = document.createElement("td");
    totalPrice.setAttribute("class", "total-price");
    totalPrice.innerText = `${priceFormatToKRW(this.calcTotalPrice())}`;

    orderItem.append(
      checkBox,
      productInfo,
      discountByCoupon,
      shippingFee,
      totalPrice
    );

    return orderItem;
  }
}

export default OrderProductItem;
