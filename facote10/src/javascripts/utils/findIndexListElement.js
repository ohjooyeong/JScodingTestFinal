// 리스트안에서 엘리먼트의 인덱스 번호를 찾는 함수
const findIndexListElement = (element) => {
  const listItems = element.parentElement.querySelectorAll("li");
  // listItems는 엄연히 보자면 Array가 아니기때문에 아래 메서드를 사용해서 Array로 만들어줌
  const currentIndex = Array.prototype.slice
    .call(listItems)
    .findIndex((listItem) => listItem === element);

  return currentIndex;
};

export default findIndexListElement;
