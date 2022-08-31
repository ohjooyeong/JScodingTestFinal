import {
    ProductImage,
    ProductPrice,
    ProductName,
    ProductLikeButton,
} from "../Product/index.js";

class ProductCard {
    constructor(item) {
        this.item = item;
    }

    render() {
        const product = document.createElement("a");
        product.setAttribute("href", `/detail/${this.item.id}`);

        const productImage = new ProductImage(this.item.thumbnailImg);
        const productName = new ProductName(this.item.productName);
        const productPrice = new ProductPrice(
            this.item.price,
            this.item.discountRate
        );
        const productLikeButton = new ProductLikeButton(this.item.id);

        product.appendChild(productImage.render());
        product.appendChild(productName.render());
        product.appendChild(productPrice.render());
        product.appendChild(productLikeButton.render());

        return product;
    }
}

export default ProductCard;
