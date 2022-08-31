class ProductPrice {
    constructor(price) {
        this.price = price;
    }

    render() {
        const productPriceContainer = document.createElement("div");
        productPriceContainer.setAttribute("class", "product-price");

        const productPrice = document.createElement("strong");
        productPrice.setAttribute("class", "price m-price");
        productPrice.innerText = this.price;

        const priceType = document.createElement("span");
        priceType.innerText = "원";

        productPrice.appendChild(priceType);

        productPriceContainer.appendChild(productPrice);

        return productPriceContainer;
    }
}

export default ProductPrice;
