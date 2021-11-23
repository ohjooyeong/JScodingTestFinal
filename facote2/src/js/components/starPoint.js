// 호보 상태에 따른 이미지 맵핑 객체
const starImageSourceMap = {
  empty: "./src/images/icon_empty_star.png",
  half: "./src/images/icon_half_star.png",
  full: "./src/images/icon_star.png",
};

class StarPoint {
  constructor() {
    this.starContentElement = document.querySelector(".content-star");

    this.starBackgroundElement =
      this.starContentElement.querySelector(".star-background");

    this.starimages = this.starBackgroundElement.querySelectorAll("img");

    this.starPointResetButton =
      this.starContentElement.querySelector(".icon-remove-star");

    this.lockedStarPoint = false; // 별점이 고정되어 있는지 아닌지 상태를 알려주는 함수이다.
  }

  setup() {
    this.bindEvents();
  }

  // 별점을 고정된 상태로 만들어 줍니다.
  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  // 별점을 고정되어 있지 않은 상태로 만들어 줍니다.
  unlockStarPoint() {
    this.lockedStarPoint = false;
  }

  // 별점의 상태를 반환합니다.
  isLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvents() {
    // 마우스 무브 이벤트
    this.starBackgroundElement.addEventListener("mousemove", (event) => {
      // 별점이 고정되어 있다면 이벤트 핸들링 중지
      if (this.isLockedStarPoint()) {
        return;
      }

      const { target, offsetX: currentUserPoint } = event; // offsetX : 타겟 요소에서의 마우스 포인터의 X축 위치를 반환합니다
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1;
      const [starimageClientRect] = target.getClientRects(); // 요소의 좌표와 크기에 대한 정보를 반환
      const starImageWidth = starimageClientRect.width;
      const isOverHalf = starImageWidth / 2 < currentUserPoint; // 마우스 포인터의 위치가 별점 중간을 넘어서면 true 아니면 false

      this.renderStarPointImages({
        drawableLimitIndex: starPointIndex,
        isOverHalf,
      });
    });

    // 마우스 클릭시 별점 고정
    this.starBackgroundElement.addEventListener("click", () =>
      this.lockStarPoint()
    );

    // 리셋버튼 이벤트 할당
    this.starPointResetButton.addEventListener("click", () => {
      this.unlockStarPoint();
      this.resetStarPointImages();
    });

    this.starBackgroundElement.addEventListener("mouseout", () => {
      !this.isLockedStarPoint() && this.resetStarPointImages();
    });
  }

  renderStarPointImages(payload = {}) {
    const { drawableLimitIndex = -1, isOverHalf = false } = payload;
    // NodeList !== Array call을 통해서 함수를 호출하는 객체를 Array에서 NodeList 객체로 재할당합니다.
    Array.prototype.forEach.call(this.starimages, (starimage, index) => {
      // 현재 순환 순서보다 마우스가 호버된 별의 인덱스가 크다면 꽉찬별, 아니면 빈별을 채운다.
      let imageSource =
        index < drawableLimitIndex
          ? starImageSourceMap.full
          : starImageSourceMap.empty;

      // 현재 순환 순서와 마우스가 호버된 별의 인덱스가 같은 경우
      if (drawableLimitIndex === index) {
        imageSource = isOverHalf
          ? starImageSourceMap.full
          : starImageSourceMap.half;
      }
      // 현재 순환중인 이미지에 src 값을 할당
      starimage.src = imageSource;
    });
  }
  resetStarPointImages() {
    this.renderStarPointImages();
  }
}

export default StarPoint;
