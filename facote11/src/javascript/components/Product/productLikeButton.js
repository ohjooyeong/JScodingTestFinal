class ProductLikeButton {
    constructor(id) {
        this.productId = id;
        this.liked = this.checkLikeStatus();
    }

    checkLikeStatus() {
        if (!localStorage.getItem("likeList")) {
            localStorage.setItem("likeList", JSON.stringify([]));
        }
        const likeList = JSON.parse(localStorage.getItem("likeList"));
        return likeList.includes(this.productId);
    }

    // 클릭을 하면 좋아요 목록에 추가한다.
    // 좋아요 목록에 추가되어 있다면 "on" 클래스를 버튼에 추가한다.
    // 좋아요 목록은 로컬스토리지를 활용하여 클라이언트에서 저장하도록 한다.
    addClickEvent(likeButton) {
        likeButton.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const likeList = JSON.parse(localStorage.getItem("likeList"));
            this.liked = !this.liked;
            this.liked && likeList.push(this.productId);
            const newLikeList = this.liked
                ? likeList
                : likeList.filter((id) => id !== this.productId);
            localStorage.setItem("likeList", JSON.stringify(newLikeList));

            this.liked
                ? e.target.classList.add("on")
                : e.target.classList.remove("on");
            console.log("좋아요 버튼 클릭");
        });
    }

    render() {
        const likeButton = document.createElement("button");
        likeButton.setAttribute("class", "like-btn");
        this.liked && likeButton.classList.add("on");

        const likeButtonIr = document.createElement("span");
        likeButtonIr.setAttribute("class", "ir");
        likeButtonIr.innerText = "좋아요 버튼";

        likeButton.appendChild(likeButtonIr);
        this.addClickEvent(likeButton);

        return likeButton;
    }
}

export default ProductLikeButton;
