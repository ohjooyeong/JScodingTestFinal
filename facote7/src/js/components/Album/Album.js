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
    // 여기에서의 루트 엘리먼트
    this.renderElement = document.querySelector(elementQuery);
    // 라우트 데이터 및 뷰를 담당할 브레드크럼
    this.breadcrumb = new Breadcrumb({ parentElement: this.renderElement });
    // 드라이브 뷰를 담당할 파인더
    this.finder = new Finder({ parentElement: this.renderElement });
    // 이미지를 띄울 이미지 뷰어
    this.imageViewer = new ImageViewer({ parentElement: this.renderElement });
    // 로딩바
    this.loading = new Loading();
    // 이벤트 바인딩
    this.bindEvents();
    // 파인더에 보여줄 데이터를 가지고 옵니다.
    await this.fetchFinder();
  }

  // 각 컴포넌트에서 발생하는 이벤트들을 바인딩한 것입니다.
  bindEvents() {
    // 다음 디렉토리로 넘기라는 호출을 받으면 넘기는 메서드를 사용합니다.
    this.finder.on("onNextDirectory", (nodeID) => this.next(nodeID));
    // 이미지 뷰어를 열어라는 호출을 받으면 해당하는 이미지를 파인더에서 찾아서 뷰어로 넘겨준다.
    this.finder.on("onOpenImageViewer", (nodeID) =>
      this.openImageViewer(nodeID)
    );
    // 브레드 크럼에서 뒤로 가라는 호출을 받으면 이전 폴더 상태로 갑니다.
    this.breadcrumb.on("back", () => this.back());
  }

  // 디렉토리를 눌렀을 때 다음 디렉토리로 가는 함수입니다.
  async next(nodeID) {
    // nodeId로 파인더에서 찾아서 해당하는 데이터를 찾습니다.
    const targetNode = this.finder.nodes.find((node) => node.id === nodeID);
    // 그 데이터를 브레드 크럼에 줘서 다음 라우터를 추가할 수 있게하고
    this.breadcrumb.forward(targetNode);
    // 그 폴더 데이터를 파인더로 가져와서 새로 렌더링하게 합니다.
    await this.fetchFinder(nodeID);
  }

  // 뒤로 가기를 실행하는 함수입니다.
  async back() {
    // 하나만 있는 것은 루트일때라 예외처리
    if (this.breadcrumb.routes.length <= 1) {
      return;
    }
    // 라우트를 뒤로 가도록 합니다.
    this.breadcrumb.back();
    const parentNode = this.breadcrumb.getParentNode(); // 최상위 부모의 노드를 받아온다
    const nodeID = parentNode?.id;
    // 그 데이터를 가지고 파인더 데이터를 새로 호출하고 렌더링 하게 합니다.
    await this.fetchFinder(nodeID);
  }

  // 이미지 뷰어를 여는 함수입니다.
  openImageViewer(nodeID = "") {
    // nodeID로 파인더에서 데이터를 조회합니다.
    const targetNode = this.finder.nodes.find((node) => node.id === nodeID);
    // 파일 주소를 가지고 이미지뷰어에게 열람하도록 합니다.
    this.imageViewer.open(targetNode.filePath);
  }

  // 파인더의 실질적인 데이터를 가져오는 함수입니다. 마지막에 로딩에 셋타임 아웃을 준 것은 좀더 자연스러운 렌더링을 위한 것이므로 큰 의미 x
  async fetchFinder(nodeID = "") {
    // 로딩창을 연다.
    this.loading.on();
    // api 함수로 데이터를 받아옵니다.
    const responseBody = await fetchObjects(nodeID);
    // 받아온 데이터를 파인더에 넣어줍니다.
    this.finder.set(responseBody);
    // 정리가 끝났으니 화면을 렌더링
    this.render();
    // 셋타임아웃은 굳이 주지 않아도 되지만, 부드러운 처리를 위해 넣었습니다.
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
