class ImageViewer {
  constructor(props) {
    const { parentElement } = props;
    this.parentElement = parentElement;
    this.renderElement = ImageViewer.createImageViewer();
    this.bindEvents();
  }

  static createImageViewer() {
    const imageViewerWrapper = document.createElement("section");
    const imageContent = document.createElement("div");
    const imageElement = document.createElement("img");

    imageViewerWrapper.classList.add("modal", "image-viewer");
    imageContent.classList.add("content");

    imageContent.appendChild(imageElement);
    imageViewerWrapper.appendChild(imageContent);

    return imageViewerWrapper;
  }

  // 클릭했을 때 이 컴포넌트의 루트 엘리먼트를 클릭하는 경우에만 닫히도록 설정
  bindEvents() {
    this.renderElement.addEventListener("click", (event) => {
      const currentTarget = event.target;

      // 검은 배경을 클릭해야 닫힘
      if (this.renderElement === currentTarget) {
        this.close();
      }
    });
  }
  // 이미지 뷰어를 여는 함수
  open(filePath = "") {
    this.renderElement.querySelector("img").src = filePath;
    this.parentElement.appendChild(this.renderElement);
  }

  // 이미지 뷰어를 닫는 함수
  close() {
    this.parentElement.removeChild(this.renderElement);
  }
}

export default ImageViewer;
