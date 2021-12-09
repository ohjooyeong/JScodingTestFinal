import Component from "../../helpers/Component.js";
import { getClosestElement } from "../../helpers/index.js";

// 실질적인 앰벌 부분.
class Finder extends Component {
  // 이벤트를 공통으로 들고있는 Component를 상속받을 것이기 때문에 여기서 super는 필수
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.renderElement = Finder.createNodesWrapper();
    parentElement.appendChild(this.renderElement);
    this.nodes = [];
    this.bindEvents();
  }

  // 만약 루트만 만들어서 컨트롤하려면 이것도 컴포넌트가 공통으로 가질 수 있게 만들어도 좋을 것 같다.
  static createNodesWrapper() {
    const nodesWrapper = document.createElement("ul");
    nodesWrapper.classList.add("finder");

    return nodesWrapper;
  }

  // 파인더에서 클릭했을 때 발생하는 이벤트를 바인딩해줍니다. 이벤트 위임을 활용함
  bindEvents() {
    this.renderElement.addEventListener("click", async (event) => {
      const targetElement = getClosestElement(event.target, "li");

      if (!targetElement) {
        return;
      }
      // 폴더 인지 파일인지와 id 값을 가져온다.
      const type = targetElement.dataset.type;
      const nodeID = targetElement.dataset.id;
      // 타입에 따라 부모에게 이벤트 호출을 함
      switch (type) {
        case "DIRECTORY": {
          this.emit("onNextDirectory", nodeID);
          break;
        }
        case "FILE": {
          this.emit("onOpenImageViewer", nodeID);
          break;
        }
      }
    });
  }

  // 부모로부터 데이터를 받아옵니다.
  set(nodes = []) {
    this.nodes = nodes;
  }

  // 가진 데이터를 렌더링합니다.
  render() {
    const nodesElement = this.nodes
      .map((node) => {
        const isDirectory = node.type === "DIRECTORY";

        if (isDirectory) {
          return `
                    <li data-id="${node.id}" data-type="${node.type}">
                        <div class="node">
                            <img src="/assets/images/icon_folder.png" />
                            <strong>${node.name}</strong>
                        </div>
                    </li>
                `;
        }

        return `
            <li data-id="${node.id}" data-type="${node.type}">
                <div class="file-image">
                    <img src="${node.filePath}" />
                </div>
                <div class="node">
                    <img src="/assets/images/icon_image.png" />
                    <strong>${node.name}</strong>
                </div>
            </li>
        `;
      })
      .join("");

    this.renderElement.innerHTML = nodesElement;

    return this.renderElement;
  }
}

export default Finder;
