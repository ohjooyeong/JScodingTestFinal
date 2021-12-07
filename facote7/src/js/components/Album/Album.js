import Breadcrumb from "./Breadcrumb.js";
import Finder from "./Finder.js";
import ImageViewer from "../ImageViewer/index.js";
import Loading from "../Loading/index.js";
import { fetchObjects } from "../../api/index.js";

class Album {
  constructor() {
    this.breadcrumb = null;
    this.finder = null;
    this.imageViewer = null;
    this.loading = null;
    this.renderElement = null;
  }

  async init(elementQuery) {
    this.renderElement = document.querySelector(elementQuery);
    this.breadcrumb = new Breadcrumb({ parentElement: this.renderElement });
    this.finder = new Finder({ parentElement: this.renderElement });
    this.imageViewer = new ImageViewer({ parentElement: this.renderElement });
    this.loading = new Loading();
    this.bindEvents();
    await this.fetchFinder();
  }

  bindEvents() {
    this.finder.on("onNextDirectory", (nodeID) => this.next(nodeID));
    this.finder.on("onOpenImageViewer", (nodeID) =>
      this.openImageViewer(nodeID)
    );
    this.breadcrumb.on("back", () => this.back());
  }

  async next(nodeID) {
    const targetNode = this.finder.nodes.find((node) => node.id === nodeID);
    this.breadcrumb.forward(targetNode);
    await this.fetchFinder(nodeID);
  }

  async back() {
    if (this.breadcrumb.routes.length <= 1) {
      return;
    }
    this.breadcrumb.back();
    const parentNode = this.breadcrumb.getParentNode(); // 최상위 부모의 노드를 받아온다
    const nodeID = parentNode?.id;
    await this.fetchFinder(nodeID);
  }

  openImageViewer(nodeID = "") {
    const targetNode = this.finder.nodes.find((node) => node.id === nodeID);
    this.imageViewer.open(targetNode.filePath);
  }

  async fetchFinder(nodeID = "") {
    this.loading.on();
    const responseBody = await fetchObjects(nodeID);
    this.finder.set(responseBody);
    this.render();
    setTimeout(() => {
      this.loading.off();
    }, 200);
  }

  render() {
    this.finder.render();
    this.breadcrumb.render();
  }
}

export default Album;
