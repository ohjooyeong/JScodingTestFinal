class Loading {
  constructor() {
    this.parentElement = document.querySelector("body");
    this.loadingElement = Loading.createLoadingElement();
    this.isLoading = false;
  }

  static createLoadingElement() {
    const loadingWrapper = document.createElement("div");
    const loadingContent = document.createElement("div");
    const loadingImage = document.createElement("img");

    loadingWrapper.classList.add("modal", "loading");
    loadingContent.classList.add("content");
    loadingImage.src = "../../../assets/images/loading.gif";
    loadingContent.appendChild(loadingImage);
    loadingWrapper.appendChild(loadingContent);

    return loadingWrapper;
  }

  on() {
    this.isLoading = true;
    this.render();
  }

  off() {
    this.isLoading = false;
    this.render();
  }

  render() {
    if (this.isLoading) {
      this.parentElement.appendChild(this.loadingElement);
    } else {
      this.parentElement.removeChild(this.loadingElement);
    }
  }
}

export default Loading;
