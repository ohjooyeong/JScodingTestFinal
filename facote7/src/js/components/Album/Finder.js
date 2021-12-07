import Component from "../../helpers/Component.js";
import { getClosestElement } from "../../helpers/index.js";

class Finder extends Component {
  constructor(props) {
    super(props);
    const { parentElement } = props;
    this.renderElement = Finder.createNodesWrapper();
    parentElement.appendChild(this.renderElement);
    this.nodes = [];
    this.bindEvents();
  }

  static createNodesWrapper() {
    const nodesWrapper = document.createElement("ul");
    nodesWrapper.classList.add("finder");

    return nodesWrapper;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", async (event) => {
      const targetElement = getClosestElement(event.target, "li");

      if (!targetElement) {
        return;
      }

      const type = targetElement.dataset.type;
      const nodeID = targetElement.dataset.id;

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

  set(nodes = []) {
    this.nodes = nodes;
  }

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
