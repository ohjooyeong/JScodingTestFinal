import { Component } from "../../core/index.js";

class ProductLikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.checkLikeList(),
    };
  }

  checkLikeList() {
    if (!localStorage.getItem("likeList")) {
      localStorage.setItem("likeList", JSON.stringify([]));
    }
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    return likeList.includes(this.props.id);
  }

  changeLiked() {
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    if (this.checkLikeList()) {
      const newLikeList = likeList.filter((id) => id !== this.props.id);
      localStorage.setItem("likeList", JSON.stringify(newLikeList));
    } else {
      likeList.push(this.props.id);
      localStorage.setItem("likeList", JSON.stringify(likeList));
    }
    this.setState({ liked: this.checkLikeList() });
    this.state.liked = this.checkLikeList();
  }

  // 클릭을 하면 좋아요 목록에 추가한다.
  // 좋아요 목록에 추가되어 있다면 "on" 클래스를 버튼에 추가한다.
  // 좋아요 목록은 로컬스토리지를 활용하여 클라이언트에서 저장하도록 한다.
  // 문제점 -> Component에서는 render에서 요소를 만들고 컴포넌트를 생성한다.
  // 해당 부분에서 요소를 직접 조작하는 것은 우리가 만든 규칙에 맞지 않아보인다.
  // 그럼 직접 요소를 조작하지 않고 하려면 어떻게 해야할까?

  // 그러면 render에서 this.state.liked에 맞춰 렌더링 해주도록 하자!
  // 클릭을 했을 때는 this.state.liked만 바꿔주자

  render() {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    this.state.liked && likeButton.classList.add("on");

    const likeButtonIr = document.createElement("span");
    likeButtonIr.setAttribute("class", "ir");
    likeButtonIr.innerText = "좋아요 버튼";

    likeButton.appendChild(likeButtonIr);

    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeLiked();
    });

    return likeButton;
  }
}

export default ProductLikeButton;
