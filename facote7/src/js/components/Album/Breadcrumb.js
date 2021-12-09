import Component from "../../helpers/Component.js";

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.routes = [{ name: "ROOT" }];
    this.parentElement = parentElement;
    this.renderElement = Breadcrumb.createBreadCrumb();
    this.init();
  }

  // 브레드크럼에서 변하지 않는 부분을 생성
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

  // 뒤로가기 버튼을 눌렀을 때 발생하는 이벤트를 넣어줍니다.
  bindEvents() {
    const backButton = this.renderElement.querySelector(".button-back");
    backButton.addEventListener("click", () => this.emit("back"));
  }

  // 브레드 크럼이 가진 데이터를 외부에서 함수로 사용하게 하는 것보다 이렇게 메서드를 뚫어 사용하게 함으로써 좀더 안전하게 관리
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

  // 네비게이션 루트 렌더링
  render() {
    const routeElements = this.routes
      .map((route) => {
        return `<span>
            ${route.name}
        </span>`;
      })
      .join("");
    this.renderElement.querySelector(".breadcrumbs").innerHTML = routeElements;

    return this.renderElement;
  }
}

export default Breadcrumb;
