class Router {
  // const router = new Router({
  //     "/": ProductPage,
  //     "/detail": ProductDetail,
  //     "/detail/:id": ProductDetail,
  // });
  constructor(routes) {
    if (!routes) {
      console.error("Can not initalize routes, need routes!");
    }
    this.routes = routes;
    this.routeParam = {};
    for (const key in routes) {
      const route = routes[key];
      if (key.indexOf(":") > -1) {
        const [_, routeName, param] = key.split("/");
        this.routeParam[routeName] = param.replace(":", "");
        this.routes["/" + routeName] = route;
        delete this.routes[key];
      }
    }
  }

  init(rootElementId) {
    if (!rootElementId) {
      console.error("Can not initalize routes, need define rootElementId");
      return null;
    }
    this.rootElementId = rootElementId;

    this.routing(window.location.pathname);

    window.addEventListener("click", (e) => {
      // 정확하게 a를 클릭했을 때에만 url로 연결이 되는 문제 해결
      // 이미지나, title이 a태그 안에 있기 때문
      // title 옆 빈 공간을 클릭하면 잘 이동함 -> 가장 근접한 조상 중 a태그를 찾도록 설계
      // if (e.target.tagName.toLowerCase() === "a") {
      //     e.preventDefault();
      //     this.routerPush(e.target.href);
      // }
      if (e.target.closest("a")) {
        e.preventDefault();
        this.routerPush(e.target.closest("a").href);
      }
    });
    window.routing = (path) => this.routerPush(path);
    window.onpopstate = () => this.routing(window.location.pathname);
  }

  routerPush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    const [_, routeName, param] = pathname.split("/");
    let page = "";

    if (this.routes[pathname]) {
      const component = new this.routes[pathname]();
      page = component.initialize();
    } else if (param) {
      // 컴포넌트를 생성할때는 object형태로 넣어주기로 했습니다.
      // key를 각각 저장해놔야 할 것 같습니다.
      const routeParam = {};
      routeParam[this.routeParam[routeName]] = param;
      const component = new this.routes["/" + routeName](routeParam);
      page = component.initialize();
    }

    if (page) {
      this.render(page);
    }
  }

  render(page) {
    const rootElement = document.querySelector(this.rootElementId);
    rootElement.innerHTML = "";
    rootElement.appendChild(page);
  }
}

export default Router;
