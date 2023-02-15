import { Component, createComponent } from "../../core/index.js";
import { SectionHeading } from "./index.js";

class ProductDetailInfo extends Component {
  render() {
    const productDetailInfo = document.createElement("section");
    productDetailInfo.setAttribute("class", "product-detail-info");

    // const sectionHeading = document.createElement("h2");
    // sectionHeading.setAttribute("class", "ir");
    // sectionHeading.innerText = "상품 상세 정보";

    const sectionHeading = createComponent(SectionHeading, {
      text: "상품 상세 정보",
    });

    const productDataList = document.createElement("dl");
    productDataList.setAttribute("class", "product-data");
    // 상품 번호
    const dtProductId = document.createElement("dt");
    dtProductId.innerText = "상품 번호";

    const ddProductId = document.createElement("dd");
    ddProductId.innerText = this.props.product.id;

    // 상품 재고수량
    const dtProductStock = document.createElement("dt");
    dtProductStock.innerText = "재고 수량";

    const ddProductStock = document.createElement("dd");
    ddProductStock.innerText = this.props.product.stockCount;

    productDataList.append(
      dtProductId,
      ddProductId,
      dtProductStock,
      ddProductStock
    );

    // 상세정보 이미지
    const productContent = document.createElement("div");
    productContent.setAttribute("class", "product-content");

    this.props.product.detailInfoImage.forEach((src) => {
      const imgSrc = `http://test.api.weniv.co.kr/${src}`;
      const imgItem = document.createElement("img");
      imgItem.setAttribute("alt", "상품 소개 이미지");
      imgItem.setAttribute("src", imgSrc);

      productContent.append(imgItem);
    });

    productDetailInfo.append(sectionHeading, productDataList, productContent);

    return productDetailInfo;
  }
}

export default ProductDetailInfo;
