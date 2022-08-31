class ProductImage {
    constructor(src) {
        this.src = src;
    }

    render() {
        const productImageContainer = document.createElement("div");
        productImageContainer.setAttribute("class", "product-img");

        const productImage = document.createElement("img");
        productImage.setAttribute(
            "src",
            `http://test.api.weniv.co.kr/${this.src}`
        );
        productImage.setAttribute("alt", `상품이미지`);
        productImageContainer.appendChild(productImage);
        return productImageContainer;
    }
}

export default ProductImage;
