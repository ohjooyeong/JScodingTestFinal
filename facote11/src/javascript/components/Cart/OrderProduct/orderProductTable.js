import { Component, createComponent } from "../../../core/index.js";
import { OrderProductPrice } from "./index.js";
/**
 * @description 주문정보 테이블
 * @param HTMLElement[] props.childrenEl : 테이블안에 들어가는 요소
 * @param boolean props.isSelectedAll: 전체선택 체크박스 선택여부
 * @param funtion props.selectAllProducts : 전체선택 체크 이벤트
 * @param funtion props.onClickDeleteButton : 선택 삭제버튼 클릭 이벤트
 * @param Object  props.orderData : 주문할 상품들
 * @param Object  props.selectedCoupons : 적용할 쿠폰들
 */
class OrderTable extends Component {
  constructor(props) {
    super(props);
  }

  calculatePay() {
    if (!this.props.orderData) {
      return { productTotalPrice: 0, shippingFee: 0, couponDiscount: 0 };
    }
    const productTotalPrice = Object.keys(this.props.orderData).reduce(
      (prev, key) => prev + this.props.orderData[key].totalPrice,
      0
    );
    const shippingFee = Object.keys(this.props.orderData).reduce(
      (prev, key) => prev + this.props.orderData[key].detail.shippingFee,
      0
    );
    const couponDiscount = this.props.selectedCoupons
      ? Object.keys(this.props.selectedCoupons).reduce(
          (prev, key) => prev + this.props.selectedCoupons[key].discount,
          0
        ) * -1
      : 0;

    return { productTotalPrice, shippingFee, couponDiscount };
  }
  // 렌더링
  render() {
    const deleteButton = document.createElement("BUTTON");
    deleteButton.type = "button";
    deleteButton.setAttribute("class", "s-button delete-product");
    deleteButton.innerText = "선택 삭제하기";
    deleteButton.addEventListener("click", this.props.onClickDeleteButton);

    // table

    const orderTable = document.createElement("table");
    orderTable.setAttribute("class", "order-table");

    // tabel title
    const tableTitle = document.createElement("h1");
    tableTitle.setAttribute("class", "ir");
    tableTitle.innerText = "주문 상품 테이블";

    // thead
    const tableHead = document.createElement("thead");
    const tableRow = document.createElement("tr");

    // 전체선택(해제) 체크박스
    const checkbox = document.createElement("th");
    checkbox.setAttribute("class", "checkbox");

    // 전체선택(해제) 체크박스 - 버튼
    const selectButton = document.createElement("button");
    selectButton.type = "button";
    selectButton.setAttribute(
      "class",
      "select-button controller" + (this.props.isSelectedAll ? " on" : "")
    );

    const spanInButton = document.createElement("span");
    spanInButton.setAttribute("class", "ir");
    spanInButton.innerText = "전체 선택";

    selectButton.append(spanInButton);
    // 전체 선택(해제) 이벤트
    selectButton.addEventListener("click", this.props.selectAllProducts);
    checkbox.append(selectButton);

    // 상품 정보
    const productInfo = document.createElement("th");
    productInfo.setAttribute("class", "product-info");
    productInfo.innerText = "상품정보";

    // 쿠폰할인
    const discountByCoupon = document.createElement("th");
    discountByCoupon.setAttribute("class", "discount-coupon");
    discountByCoupon.innerText = "쿠폰할인";

    // 배송비
    const shippingFee = document.createElement("th");
    shippingFee.setAttribute("class", "shipping-fee");
    shippingFee.innerText = "배송비";

    // 주문금액
    const totalPrice = document.createElement("th");
    totalPrice.setAttribute("class", "total-price");
    totalPrice.innerText = "주문금액";

    tableRow.append(
      checkbox,
      productInfo,
      discountByCoupon,
      shippingFee,
      totalPrice
    );
    tableHead.append(tableRow);

    // tbody
    const orderList = document.createElement("tbody");
    orderList.setAttribute("class", "order-list");
    if (this.props.childrenEl && this.props.childrenEl.length > 0) {
      orderList.append(...this.props.childrenEl);
    } else {
      const noProductMsg = document.createElement("p");
      noProductMsg.setAttribute("class", "no-product");
      noProductMsg.innerText = "장바구니에 담긴 상품이 없습니다.";

      orderList.append(noProductMsg);
    }

    orderTable.append(tableTitle, tableHead, orderList);
    const orderPrice = createComponent(OrderProductPrice, {
      ...this.calculatePay(),
    });
    const frag = new DocumentFragment();
    frag.append(deleteButton, orderTable, orderPrice);
    return frag;
  }
}

export default OrderTable;
