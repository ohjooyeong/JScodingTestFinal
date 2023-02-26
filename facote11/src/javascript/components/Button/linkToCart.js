import { Component } from "../../core/index.js";

export default class LinkToCart extends Component {
    // 장바구니 페이지 링크 렌더링
    render() {
        const cartPageLink = document.createElement("A");
        cartPageLink.setAttribute("class", "link-btn cart-link");
        cartPageLink.href = "/cart";

        const cartPageSpan = document.createElement("SPAN");
        cartPageSpan.setAttribute("class", "ir");
        cartPageSpan.innerText = "장바구니로 이동하기";

        cartPageLink.append(cartPageSpan);

        return cartPageLink;
    }
}