import { Component, createComponent } from '../../../core/index.js';
import { ProductImage, ProductName, ProductPrice } from '../../Product/index.js';
/**
 * @description 상품정보를 펼쳐서 넣어주세요
 * @param funtion onClickBox : 체크박스 클릭 이벤트
 * @param boolean isSelected : 체크박스 선택
 * @param string thumbnailImg : 이미지 주소
 * @param strin productName : 상품이름
 * @param number discountRate : 할인퍼센트
 * @param nuber price : 상품금액
 * @param string optionText : 옵션,개수 등 텍스트
 * @param string couponName : 적용쿠폰 이름
 * @param string discount : 쿠폰금액 ~원 형식으로
 * @param number totalPrice : 전체가격
 */
class OrderItem extends Component {
    // 렌더링
    render() {
        const orderItem = document.createElement("tr");
        orderItem.setAttribute("class", "order-item");
            
        // 상품 선택 체크박스
        const checkBox = document.createElement("td");
        checkBox.setAttribute("class", "checkbox");

        const selectButton = document.createElement("button");
        selectButton.type = "button";
        selectButton.setAttribute("class", `select-button ${this.props.isSelected ? "on" : ""}`);

        const spanInButton = document.createElement("span");
        spanInButton.setAttribute("class", "ir");
        spanInButton.innerText = "선택";

        selectButton.append(spanInButton);

        selectButton.addEventListener("click", this.props.onClickBox);

        checkBox.append(selectButton);

        // 상품 정보
        const productInfo = document.createElement("td");
        productInfo.setAttribute("class", "product-info");

        const productImage = createComponent(ProductImage, { src : this.props.thumbnailImg });

        const productInfoDiv = document.createElement("div");
        productInfoDiv.setAttribute("class", "display-right");

        const productName = createComponent(ProductName, { name : this.props.productName });
        productName.classList.add("sl-ellipsis");

        const productPrice = createComponent(ProductPrice, { price : this.props.price||0, discountRate: this.props.discountRate });

        const optionText = document.createElement("p");
        optionText.innerText = this.props.optionText

        productInfoDiv.append(productName, productPrice, optionText);
        productInfo.append(productImage, productInfoDiv);

        // 쿠폰 할인
        const discountByCoupon = document.createElement("td");
        discountByCoupon.setAttribute("class", "discount-coupon");

        const couponName = document.createElement("strong");
        couponName.setAttribute("class", "name sl-ellipsis");
        couponName.innerText = this.props.couponName||"-"

        const couponPrice = document.createElement("strong");
        couponPrice.setAttribute("class", "price");
        couponPrice.innerText = (this.props.discount?("-"+this.props.discount+"원"):"")||"-"

        discountByCoupon.append(couponName, couponPrice);

        const shippingFee = document.createElement("td");
        shippingFee.setAttribute("class", "shipping-fee");
        shippingFee.innerText = this.props.shippingFee?(this.props.shippingFee+"원"):"무료배송"

        const totalPrice = document.createElement("td");
        totalPrice.setAttribute("class", "total-price");
        totalPrice.innerText = this.props.totalPrice +'원'

        orderItem.append(checkBox, productInfo, discountByCoupon, shippingFee, totalPrice);

        return orderItem;
    }
}

export default OrderItem