import { Component } from "../../core/index.js";

class LinkToMain extends Component {
    // 메인페이지(상품 목록) 링크 렌더링
    render() {
        const mainPageLink = document.createElement("A");
        mainPageLink.setAttribute("class", "link-btn main-link");
        mainPageLink.href = "/";

        const spanInLink = document.createElement("SPAN");
        spanInLink.setAttribute("class", "ir");
        spanInLink.innerText = "상품 목록 페이지로 이동하기";

        mainPageLink.append(spanInLink);

        return mainPageLink;
    }
}

export default LinkToMain