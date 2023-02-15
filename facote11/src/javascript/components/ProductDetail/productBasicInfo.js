import { Component, createComponent } from "../../core/index.js";
import { SectionHeading } from "./index.js";
import { ProductImage, ProductName, ProductPrice } from "../Product/index.js";
import { OrderForm } from "../ProductOrder/index.js";

class ProductBasicInfo extends Component {
  render() {
    const productBasicInfo = document.createElement("section");
    productBasicInfo.setAttribute("class", "product-basic-info");

    const sectionHeading = createComponent(SectionHeading, {
      text: "기본 정보 및 상품 옵션",
    });
    const productImage = createComponent(ProductImage, {
      src: this.props.product.thumbnailImg,
    });

    const productInfoContainer = document.createElement("div");
    productInfoContainer.setAttribute("class", "product-info");

    const productNamePriceContainer = document.createElement("div");
    productNamePriceContainer.setAttribute("class", "product-name-price");

    const productName = createComponent(ProductName, {
      name: this.props.product.productName,
    });
    const productPrice = createComponent(ProductPrice, {
      price: this.props.product.price,
      discountRate: this.props.product.discountRate,
    });

    productNamePriceContainer.append(productName, productPrice);

    const orderForm = createComponent(OrderForm, {
      product: this.props.product,
    });

    productInfoContainer.append(productNamePriceContainer, orderForm);
    productBasicInfo.append(sectionHeading, productImage, productInfoContainer);
    return productBasicInfo;
  }
}

export default ProductBasicInfo;
