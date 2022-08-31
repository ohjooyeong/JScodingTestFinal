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

        for (const key in routes) {
            const route = routes[key];
            if (key.indexOf(":") > -1) {
                const [_, routeName, param] = key.split("/");
                this.routes["/" + routeName] = route;
                delete this.routes[key];
            }
        }
    }

    init(rootElementId) {
        if (!rootElementId) {
            console.error(
                "Can not initalize routes, need define rootElementId"
            );
            return null;
        }
        this.rootElementId = rootElementId;

        this.routing(window.location.pathname);

        window.addEventListener("click", (e) => {
            if (e.target.tagName.toLowerCase() === "a") {
                e.preventDefault();
                this.routerPush(e.target.href);
            }
        });

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
            page = component.render();
        } else if (param) {
            const component = new this.routes["/" + routeName](param);
            page = component.render();
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
