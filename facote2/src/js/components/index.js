class Favorite {
  constructor() {
    this.favoriteElement = document.querySelector(".content-favorite");
  }

  setup() {
    this.bindEvents();
  }

  bindEvents() {
    this.favoriteElement.addEventListener("click", (event) => {
      // 이벤트 경로값을 배열로 받는다
      // 자식에서 부모까지 전체
      const cPath = event.composedPath();
      const element = cPath.find((element) => element.tagName === "BUTTON");

      if (!element) {
        return;
      }

      element.classList.toggle("on");
    });
  }
}

export default Favorite;
