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
  constructor() {}

  setup() {
    this.bindEvent();
  }

  bindEvent() {
    console.log("hello");
  }
}

export default EventCard;
