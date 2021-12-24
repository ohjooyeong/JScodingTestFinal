import { removeAllChildNodes } from "../../utils/index.js";

export default class SearchView {
  constructor() {
    this.rootElement = SearchView.createRootElement();
    this.searchedMusics = [];
    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-search");
    rootElement.innerHTML = `
        <div class="search-controller">
            <input type="text" class="search-input" placeholder="검색" />
            <button class="search-button">
            <i class="icon-search-controller"></i>
            </button>
        </div>
        <ul class="music-list"></ul>
    `;

    return rootElement;
  }

  bindEvents() {
    this.rootElement
      .querySelector(".search-input")
      .addEventListener("input", (event) => {
        const query = event.target.value;
        this.emit("searchMusic", query);
      });

    this.rootElement.addEventListener("click", (event) => {
      const { target } = event.target;
      const isControllerButton = target.tagName === "BUTTON";

      if (!isControllerButton) {
        return;
      }

      const buttonRole = target.classList.item(1);
      switch (buttonRole) {
        case "icon-play":
          this.requestPlay(target);
          break;
        case "icon-pause":
          this.requestPause(target);
          break;
        case "icon-plus":
          this.requestAddPlayList(target);
          break;

        default:
          break;
      }
    });
  }

  // 모든 음악 재생 상태를 중단하는 UI 변경을 처리합니다.
  renderStopAll() {
    const playingButtons = this.rootElement.querySelectorAll(".icon-pause");
    playingButtons.forEach((element) =>
      element.classList.replace("icon-pause", "icon-play")
    );
  }

  // 음악 재생을 App.js 에 요청합니다.
  requestPlay(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musics: this.musics, musicIndex };
    this.emit("play", payload);
    this.renderStopAll();
    target.classList.replace("icon-play", "icon-pause");
  }

  // 음악 중단을 App.js 에 요청합니다.
  requestPause(target) {
    this.emit("pause");
    target.classList.replace("icon-pause", "icon-play");
  }

  // 플레이 리스트에 추가 요청
  requestAddPlayList(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musics: this.musics, musicIndex };
    this.emit("addPlayList", payload);
  }

  setSearchResult(musiclist = []) {
    this.searchedMusics = musiclist;
    this.renderSearchedMusics();
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  renderSearchedMusics() {
    const musicListElement = this.rootElement.querySelector(".music-list");
    removeAllChildNodes(musicListElement);
    const searchedMusics = this.searchedMusics
      .map((music, index) => {
        const { cover, title, artists } = music;
        return `
        <li>
            <div class="music-content">
                <div class="music-data">
                    <div class="music-cover">
                        <img src="${cover}" />
                    </div>
                    <div class="music-info">
                        <strong class="music-title">${title}</strong>
                        <em class="music-artist">${artists[0]}</em>
                    </div>
                </div>
                <div class="music-simple-controller" data-index=${index}>
                    <button class="icon icon-play">
                        <span class="invisible-text">재생</span>
                    </button>
                    <button class="icon icon-plus">
                        <span class="invisible-text">추가</span>
                    </button>
                </div>
            </div>
        </li>
      `;
      })
      .join("");

    musicListElement.innerHTML = searchedMusics;
  }

  render() {
    return this.rootElement;
  }
}
