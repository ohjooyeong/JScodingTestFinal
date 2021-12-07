import Component from "../../helpers/Component.js";

class Breadcrumb extends Component {
  constructor() {
    super(props);
    const { parentElement } = props;
    this.routes = [{ name: "ROOT" }];
    this.parentElement = parentElement;
    this.renderElement = Breadcrumb.createBreadCrumb();
    this.init();
  }

  static createBreadCrumb() {
    const breadcrumbWrapper = document.createElement("section");
    breadcrumbWrapper.classList.add("breadcrumb-container");
    const breadcrumb = document.createElement("div");
    breadcrumb.classList.add("breadcrumbs");
    breadcrumbWrapper.appendChild(breadcrumb);

    const backButton = document.createElement("button");
    backButton.classList.add("button-back");
    breadcrumbWrapper.appendChild(backButton);

    return breadcrumbWrapper;
  }

  init() {
    this.parentElement.appendChild(this.renderElement);
    this.bindEvents();
  }

  bindEvents() {
    const backButton = this.renderElement.querySelector(".button-back");
    backButton.addEventListener("click", () => this.emit("back"));
  }

  forward(route) {
    this.routes.push(route);
    return this;
  }

  back() {
    this.routes.pop();
    return this;
  }

  getParentNode() {
    return this.routes[this.routes.length - 1];
  }

  render() {
    const routeElements = this.routes
      .map((route) => {
        `<span>
            ${route.name}
        </span>`;
      })
      .join("");
    this.renderElement.querySelector(".breadcrumbs").innerHTML = routeElements;

    return this.renderElement;
  }
}

export default Breadcrumb;
