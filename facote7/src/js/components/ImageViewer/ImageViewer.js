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

  bindEvents() {
    this.renderElement.addEventListener("click", (event) => {
      const currentTarget = event.target;

      // 검은 배경을 클릭해야 닫힘
      if (this.renderElement === currentTarget) {
        this.close();
      }
    });
  }

  open(filePath = "") {
    this.renderElement.querySelector("img").src = filePath;
    this.parentElement.appendChild(this.renderElement);
  }

  close() {
    this.parentElement.removeChild(this.renderElement);
  }
}

export default ImageViewer;
