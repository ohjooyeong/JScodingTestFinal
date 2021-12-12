const defaultLocation = [];
const movePeaceArr = []; // default 위치에서 얼만큼 이동했는지 저장하는 배열

const peaces = document.querySelectorAll(".peace");
const voidPeace = document.querySelector(".void");
const moveCount = document.querySelector(".move_count");
const timer = document.querySelector(".timer");
const answer = document.querySelector(".answer");
const puzzle = document.querySelector(".puzzle");

let move = 0;
let time = 0;
let timeCounter = null;

function convertNum(num) {
  return num > 9 ? num : "0" + num;
}

function setTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  timer.innerHTML = convertNum(minutes) + ":" + convertNum(seconds);
}

function timeCount() {
  time++;
  setTime();
}

function moveCountDisplay() {
  move++;
  moveCount.innerHTML = move;
}

// 이동횟수, 시간 초기화

function initMoveTime() {
  move = 0;
  time = 0;
  moveCount.innerHTML = move;
  if (timeCounter) {
    clearInterval(timeCounter);
    setTime();
  }
}

// 현재 위치에서 이동한 위치를 확인하여 정답 확인
// 모든 퍼즐의 이동한 거리가 0이면 정답으로 처리
function answerCheck() {
  let isAnswer = true;
  for (let i = 0; i < movePeaceArr.length; i++) {
    if (movePeaceArr[i][0] !== 0 || movePeaceArr[i][1] !== 0) {
      isAnswer = false;
      break;
    }
  }
  if (isAnswer) {
    answerView();
  }
}

// 퍼즐 이동
function paeceMove(target, checkVoid, dir) {
  if (checkVoid) {
    // 최종 반영되는 좌표인 movePeaceArr배열을 참고하여
    // 빈칸과 퍼즐조각의 움직일 거리를 반영시켜준다.
    movePeaceArr[target.id - 1] = [
      movePeaceArr[target.id - 1][0] + dir[0],
      movePeaceArr[target.id - 1][1] + dir[1],
    ];
    movePeaceArr[checkVoid.id - 1] = [
      movePeaceArr[checkVoid.id - 1][0] - dir[0],
      movePeaceArr[checkVoid.id - 1][1] - dir[1],
    ];

    target.style.transform = `translate(${movePeaceArr[target.id - 1][0]}px, ${
      movePeaceArr[target.id - 1][1]
    }px)`;

    checkVoid.style.transform = `translate(${
      movePeaceArr[checkVoid.id - 1][0]
    }px, ${movePeaceArr[checkVoid.id - 1][1]}px)`;
  }
}

// 빈 공간인지 확인
function isVoid(checkVoid) {
  if (checkVoid.className) {
    if (checkVoid.className === "void") {
      return true;
    }
  }
  return false;
}

function answerView() {
  document.querySelector(
    ".answer_move"
  ).innerHTML = `move : ${moveCount.innerHTML}`;
  document.querySelector(
    ".answer_time"
  ).innerHTML = `time : ${timer.innerHTML}`;
  puzzle.removeEventListener("click", moveEvent);
  initMoveTime();
  answer.style.display = "block";
}

// select 퍼즐 기준 상, 하, 좌, 우 탐색
function findVoid(target, x, y) {
  const dir = [
    [0, -80],
    [0, 80],
    [-80, 0],
    [80, 0],
  ];
  // 퍼즐에 border-radius 속성으로 인해 선택이 되지 않음
  // target 퍼즐 가운데 위치로 지정(70x70크기의 div이므로 35,35부분을 선택)
  const X = x + 35;
  const Y = y + 35;

  for (const d of dir) {
    const checkVoid = document.elementFromPoint(X + d[0], Y + d[1]);
    if (isVoid(checkVoid)) {
      return [checkVoid, d];
    }
  }
}

// 클릭한 퍼즐의 좌표(x, y) 추출
function moveEvent(e) {
  const target = e.target;

  if (target.className === "peace") {
    // 클릭한 퍼즐의 x, y 좌표를 구한다.
    const { x, y } = target.getBoundingClientRect();
    // 클릭한 퍼즐의 좌표를 이용하여 주변에 void가 있는지 확인한다.
    resultFind = findVoid(target, x, y);
    paeceMove(target, ...resultFind);
    moveCountDisplay();
    answerCheck();
  }
}

// 좌표값을 랜덤으로 섞고 바뀐 좌표와 default 좌표에 차이를 입력
function random() {
  // 각 인덱스에 해당하는 퍼즐이 값에 해당하는 위치로 배열되야합니다. 16은 빈공간입니다.
  // ex) 1번째 퍼즐조각은 5번째위치로, 2번재 퍼즐조각은 3번째위치로
  const sample = [5, 3, 12, 4, 6, 13, 1, 7, 9, 14, 16, 8, 11, 10, 2, 15];
  const moveLocation = [];

  // sample의 값을 이용하여 해당되는 위치를 매핑한다
  for (const idx in sample) {
    // console.log(idx);
    moveLocation[sample[idx] - 1] = defaultLocation[idx];
  }

  // console.log(moveLocation);
  // console.log(defaultLocation);

  // 이동할 조각의 위치와 원래 조각의 위치의 차이를 구해 움직여야하는 거리를 구하여 최종적으로 반영될 배열에 넣어준다.
  for (let i = 0; i < defaultLocation.length; i++) {
    movePeaceArr[i] = [
      moveLocation[i][0] - defaultLocation[i][0],
      moveLocation[i][1] - defaultLocation[i][1],
    ];
  }
}

// 최초에 init을 하기 위한 함수
function setPeace() {
  peaces.forEach(
    (el, i) =>
      (el.style.transform = `translate(${movePeaceArr[i][0]}px, ${movePeaceArr[i][1]}px)`)
  );
  voidPeace.style.transform = `translate(${
    movePeaceArr[movePeaceArr.length - 1][0]
  }px, ${movePeaceArr[movePeaceArr.length - 1][1]}px)`;
}

function gameStart() {
  initMoveTime();
  random();
  puzzle.addEventListener("click", moveEvent);
  setPeace();
  timeCounter = setInterval(timeCount, 1000);
}

function resetGame() {
  setPeace();
  puzzle.removeEventListener("click", moveEvent);
  initMoveTime();
}

// 퍼즐 각각의 위치 값 저장, movePeaceArr 초기화
function init() {
  document.querySelector(".start_button").addEventListener("click", gameStart);
  document.querySelector(".reset_button").addEventListener("click", resetGame);
  document.querySelector(".answer_button").addEventListener("click", () => {
    answer.style.display = "none";
  });

  // 최초 퍼즐조각 및 빈공간 좌표저장
  // IE를 호환해야 한다고 한다면 [...peaces].forEach(el => {}); 로 사용
  // Array.prototype.forEach (IE 9이상 지원)
  // NodeList.prototype.forEach (IE 지원X)
  peaces.forEach((el) => {
    const { x, y } = el.getBoundingClientRect();
    defaultLocation.push([x, y]);
  });
  const { x, y } = voidPeace.getBoundingClientRect();
  defaultLocation.push([x, y]);

  for (let i = 0; i < peaces.length; i++) {
    movePeaceArr[i] = [0, 0];
  }
}

init();
