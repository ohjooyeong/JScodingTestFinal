import { Intro, TabButtons, TopMusics } from "./components/index.js";
import removeAllChildNodes from "./utils/removeAllChildNodes.js";
import { fetchMusics } from "../APIs/index.js";

export default class App {
  constructor(props) {
    this.props = props;
    this.currentMainIndex = 0;
    this.mainViewComponents = [];
  }

  async setup() {
    const { el } = this.props;
    this.rootElement = document.querySelector(el);
    this.intro = new Intro();
    this.tabButtons = new TabButtons();
    this.topMusics = new TopMusics();
    this.mainViewComponents = [this.topMusics];

    this.bindEvents();
    await this.fetchMusics();
    this.init();
  }

  bindEvents() {
    // 탭버튼 컴포넌트 이벤트
    this.tabButtons.on("clickTab", (payload) => {
      const { currentIndex = 0 } = payload;
      this.currentMainIndex = currentIndex;
      this.render();
    });

    // 탑뮤직 컴포넌트 이벤트
    this.topMusics.on("play", (payload) => {
      // this.playView.playMusic(payload)
    });
    this.topMusics.on("pause", () => {
      this.playView.pause();
    });
    this.topMusics.on("addPlayList", (payload) => {
      const { musics, musicIndex } = payload;
      // this.playList.add(musics[musicIndex]);
    });
  }

  async fetchMusics() {
    const responseBody = await fetchMusics();
    const { musics = [] } = responseBody;
    this.topMusics.setMusics(musics);
  }

  init() {
    this.intro.show();
    setTimeout(() => {
      this.render();
      this.intro.hide();
    }, 2000);
  }

  renderMainView() {
    const renderComponent = this.mainViewComponents[this.currentMainIndex];
    return renderComponent ? renderComponent.render() : "";
  }

  render() {
    removeAllChildNodes(this.rootElement);
    const tabButtons = this.tabButtons.render();
    const mainView = this.renderMainView();
    this.rootElement.append(tabButtons);
    this.rootElement.append(mainView);
  }
}
