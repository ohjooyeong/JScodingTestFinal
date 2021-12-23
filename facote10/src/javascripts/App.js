import { Intro } from "./components/index.js";

export default class App {
  constructor() {}

  async setup() {
    this.intro = new Intro();
    this.init();
  }

  init() {
    this.intro.show();
    setTimeout(() => {
      this.intro.hide();
    }, 2000);
  }
}
