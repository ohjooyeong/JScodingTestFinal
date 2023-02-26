import { LinkToCart } from "../components/Button/index.js";
import { ProductCard } from "../components/ProductCard/index.js";
import { Component, createComponent } from "../core/index.js";

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: [],
    };
    this.getProductData();
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch("http://test.api.weniv.co.kr/mall");
    const data = await response.json();

    this.setState({ product: data });
  }

  render() {
    this.mainElement = document.createElement("main");

    this.mainElement.classList.add("product");

    const productHeader = document.createElement("h1");
    productHeader.setAttribute("class", "ir");
    productHeader.innerText = "상품목록 페이지";
    this.mainElement.appendChild(productHeader);

    const productList = document.createElement("ul");
    productList.setAttribute("class", "product-list");

    this.state.product.forEach(async (item) => {
      const productItem = document.createElement("li");
      productItem.setAttribute("class", "product-item");
      if (item.stockCount < 1) {
        productItem.classList.add("sold-out");
      }
      const productCard = new ProductCard({ item: item });
      productItem.appendChild(productCard.render());
      productList.append(productItem);
    });
    const linkToCart = createComponent(LinkToCart, {});
    this.mainElement.append(productList, linkToCart);

    return this.mainElement;
  }
}

export default ProductPage;
