class ProductImage {
    constructor(name) {
        this.name = name;
    }

    render() {
        const productName = document.createElement("strong");
        productName.setAttribute("class", "product-name");
        productName.innerText = this.name;
        return productName;
    }
}

export default ProductImage;
