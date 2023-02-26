import { Component } from "../../../core/index.js";

/**
 * @description 주문상품 총 합계금액 등등 정보
 * @param number productTotalPrice : 할인/배송비 등을 적용하지 않은상품 총금액
 * @param number couponDiscount : 할인금액
 * @param number shippingFee : 배송비
 */
export default class OrderProductPrice extends Component {
    // 렌더링
    render() {
        // datalist
        const orderTotal = document.createElement("DL");
        orderTotal.setAttribute("class", "order-total");

        const heading = document.createElement("H3");
        heading.setAttribute("class", "ir");
        heading.innerText = "주문 상품 총 합계 금액";

        // 총 상품 금액
        const productTotal = document.createElement("DIV");
        productTotal.setAttribute("class", "product-total");
        
        const productTotalName = document.createElement("DT");
        productTotalName.innerText = "총 상품금액";

        const productTotalData = document.createElement("DD");
        productTotalData.setAttribute("class", "m-price");
        productTotalData.innerText = this.props.productTotalPrice;

        const productTotalPriceType = document.createElement("SPAN");
        productTotalPriceType.innerText = "원";

        productTotalData.append(productTotalPriceType);
        productTotal.append(productTotalName, productTotalData);

        // 쿠폰 할인
        const couponTotal = document.createElement("DIV");
        couponTotal.setAttribute("class", "coupon-total");
        
        const couponTotalName = document.createElement("DT");
        couponTotalName.innerText = "쿠폰할인";

        const couponTotalData = document.createElement("DD");
        couponTotalData.setAttribute("class", "m-price");
        couponTotalData.innerText = this.props.couponDiscount;

        const couponTotalPriceType = document.createElement("SPAN");
        couponTotalPriceType.innerText = "원";

        couponTotalData.append(couponTotalPriceType);
        couponTotal.append(couponTotalName, couponTotalData);

        // 배송비
        const shippingTotal = document.createElement("DIV");
        shippingTotal.setAttribute("class", "shipping-total");
        
        const shippingTotalName = document.createElement("DT");
        shippingTotalName.innerText = "배송비";

        const shippingTotalData = document.createElement("DD");
        shippingTotalData.setAttribute("class", "m-price");
        shippingTotalData.innerText = this.props.shippingFee;

        const shippingTotalPriceType = document.createElement("SPAN");
        shippingTotalPriceType.innerText = "원";

        shippingTotalData.append(shippingTotalPriceType);
        shippingTotal.append(shippingTotalName, shippingTotalData);

        // 결제 예정 금액
        const totalPayment = document.createElement("DIV");
        totalPayment.setAttribute("class", "total-payment");
        
        const totalPaymentName = document.createElement("DT");
        totalPaymentName.innerText = "결제 예정 금액";

        const totalPaymentData = document.createElement("DD");
        totalPaymentData.setAttribute("class", "l-price");
        totalPaymentData.innerText = this.props.productTotalPrice+this.props.shippingFee+this.props.couponDiscount;

        const totalPaymentType = document.createElement("SPAN");
        totalPaymentType.innerText = "원";

        totalPaymentData.append(totalPaymentType);
        totalPayment.append(totalPaymentName, totalPaymentData);

        orderTotal.append(heading, productTotal, couponTotal, shippingTotal, totalPayment);

        return orderTotal;
    }
}