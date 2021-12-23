export default class Intro {
  constructor() {
    this.parentElement = document.querySelector("body");
    this.renderElement = Intro.createRenderElement();
  }

  static createRenderElement() {
    const introContainer = document.createElement("div");
    introContainer.classList.add("intro");
    const introImage = document.createElement("img");
    introImage.src = "assets/images/Logo.png";

    introContainer.appendChild(introImage);
    return introContainer;
  }

  show() {
    this.parentElement.append(this.renderElement);
  }

  hide() {
    this.renderElement.style.opacity = 0;
    setTimeout(() => {
      this.parentElement.removeChild(this.renderElement);
    }, 1000);
  }
}
