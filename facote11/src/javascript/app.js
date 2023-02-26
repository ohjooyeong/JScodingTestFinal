import { ProductPage, ProductDetail, CartPage } from "./pages/index.js";
import { Router } from "./utils/index.js";

export default class App {
  constructor(props) {
    this.props = props;
  }

  setup() {
    const { el } = this.props;

    const router = new Router({
      "/": ProductPage,

      "/detail/:id": ProductDetail,
      "/cart": CartPage,
    });

    router.init(el);
  }
}
