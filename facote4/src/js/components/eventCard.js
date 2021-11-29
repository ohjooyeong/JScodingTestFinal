/*
    <step1>
    1. 카드를 클릭합니다.
    2. 클릭한 카드에 on 클래스를 붙입니다. ---> 뒤집어집니다.
    3. 클릭한 카드의 정보를 변수에 저장합니다.

    <step2>
    1. 두번째 카드를 클릭합니다.
    2. 클릭한 카드에 on 클래스를 붙입니다. ---> 뒤집어집니다.
    3. 클릭한 카드의 정보를 변수에 저장합니다.

    <step3>
    1. 저장한 데이터를 통해 클릭한 두 요소의 data-name 값을 비교합니다.
    2. 값이 같다면 두 요소를 숨겨야합니다.
    3. 값이 다르다면 두 요소의 on클래스를 제거합니다.
    4. 저장해뒀던 카드의 정보를 삭제합니다.
*/

class EventCard {
  constructor() {
    this.cards = document.querySelector(".list-card");
    this.cardEl = [];
  }

  setup() {
    this.bindEvent();
  }

  bindEvent() {
    this.cards.addEventListener("click", (e) => {
      const elClicked = e.target;

      // 카드를 클릭했다면
      if (elClicked.nodeName === "LI") {
        // 저장된 데이터가 두개 미만이고, 같은 카드를 중복으로 클릭하지 않았다면
        if (this.cardEl.length < 2 && this.cardEl[0] !== elClicked) {
          this.cardEl.push(elClicked); // 클릭한 카드 데이터 저장
          elClicked.classList.add("on"); // 카드 뒤집기

          if (this.cardEl.length === 2) {
            setTimeout(() => {
              this.cardEl.forEach((item) => {
                // 같은 카드를 선택했을 경우
                if (
                  this.cardEl[0].dataset.name === this.cardEl[1].dataset.name
                ) {
                  item.style.visibility = "hidden";
                } else {
                  // 다른 카드를 선택했을 경우
                  item.classList.remove("on");
                }
              });
              this.cardEl.splice(0); // 카드 데이터 초기화
            }, 500);
          }
        }
      }
    });
  }
}

export default EventCard;
