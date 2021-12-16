let click = true;
let resNum = 1;
let hour = 8;
let endTime = 22;
let min = 1;

let data = [];

class Restaurant {
  constructor(table1, table2, table4) {
    this.tableConfirm = [
      {
        kind: "table1",
        number: 0,
        chair: table1[0].getElementsByClassName("chair-item")[0],
        status: "available",
      },
      {
        kind: "table1",
        number: 1,
        chair: table1[0].getElementsByClassName("chair-item")[1],
        status: "available",
      },
      {
        kind: "table1",
        number: 2,
        chair: table1[0].getElementsByClassName("chair-item")[2],
        status: "available",
      },
      {
        kind: "table2",
        number: 3,
        chair: table2[0].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table2",
        number: 4,
        chair: table2[1].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table2",
        number: 5,
        chair: table2[2].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table4",
        number: 6,
        chair: table4[0].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table4",
        number: 7,
        chair: table4[1].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table4",
        number: 8,
        chair: table4[2].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table4",
        number: 9,
        chair: table4[3].getElementsByClassName("chair-item"),
        status: "available",
      },
      {
        kind: "table4",
        number: 10,
        chair: table4[4].getElementsByClassName("chair-item"),
        status: "available",
      },
    ];
  }

  clock() {
    let displayTime = document.getElementsByClassName("time")[0];
    displayTime.innerText = `${hour < 10 ? `0${hour}` : hour}:${
      min < 10 ? `0${min}` : min
    }:00`;
    min += 1;

    if (min >= 60) {
      min = 0;
      hour += 1;
    }
  }
}

class RestaurantGuests {
  constructor(resNum, resPeople, curStatus) {
    this.resNum = resNum;
    this.resPeople = resPeople;
    this.curStatus = curStatus;
    this.mealTime = 0;
    this.mealTable = -1;
  }
}

function clickButton() {
  const input = document.getElementById("식사인원");
  let resPeople;

  resPeople = parseInt(input.value, 10);
  input.value = "";
  document.getElementById("경고문구").innerHTML = "";

  if (hour >= endTime) {
    document.getElementById("경고문구").innerHTML =
      "<strong>※ 영업이 종료되었습니다. ※</strong>";
    return;
  }

  if (resPeople >= 5) {
    document.getElementById("경고문구").innerHTML =
      "<strong>※ 코로나로 인해 5인 이상은 예약을 받고 있지 않습니다. ※</strong>";
    data.push(new RestaurantGuests(resNum, resPeople, "거절"));
    resNum += 1;
  } else if (resPeople >= 0) {
    //   식사 중 또는 대기중
    data.push(new RestaurantGuests(resNum, resPeople, "대기중"));
    resNum += 1;
  } else {
    document.getElementById("경고문구").innerHTML =
      "<strong>※ 제대로 된 숫자를 입력하세요. ※</strong>";
  }
  createTable();
}

function createTable() {
  let tableBodyData = [];
  for (const iterator of data) {
    if (iterator.curStatus === "대기중") {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td class="waiting">${iterator.curStatus}</td>
            </tr>
        `);
    } else if (iterator.curStatus === "거절") {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td class="reject">${iterator.curStatus}</td>
            </tr>
        `);
    } else {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td>${iterator.curStatus}</td>
            </tr>
        `);
    }
  }
  document.querySelector(".reservation-table > tbody").innerHTML =
    tableBodyData.join("");
}

function clickOpenBusiness() {
  const table1 = document.getElementsByClassName("bar-table");
  const table2 = document.getElementsByClassName("rec-table");
  const table4 = document.getElementsByClassName("circle-table");

  let restaurant = new Restaurant(table1, table2, table4);

  // console.log(restaurant);
  // table2[1].getElementsByClassName("chair-item")[1].classList.add("on");

  let timer = setInterval(function () {
    restaurant.clock();
    for (const guest of data) {
      if (guest.curStatus === "대기중") {
        if (guest.resPeople === 1) {
          for (const table of restaurant.tableConfirm) {
            if (
              table.kind === "table1" &&
              table.status === "available" &&
              guest.curStatus === "대기중"
            ) {
              table.chair.classList.add("on");
              table.status = "notAvailable";
              guest.curStatus = "식사중";
              guest.mealTable = table.number;
            }
          }
        } else if (guest.resPeople === 2) {
          for (const table of restaurant.tableConfirm) {
            if (
              table.kind === "table2" &&
              table.status === "available" &&
              guest.curStatus === "대기중"
            ) {
              table.chair[0].classList.add("on");
              table.chair[1].classList.add("on");
              table.status = "notAvailable";
              guest.curStatus = "식사중";
              guest.mealTable = table.number;
            }
          }
        } else {
          for (const table of restaurant.tableConfirm) {
            if (
              table.kind === "table4" &&
              table.status === "available" &&
              guest.curStatus === "대기중"
            ) {
              for (let person = 0; person < guest.resPeople; person++) {
                table.chair[person].classList.add("on");
              }
              table.status = "notAvailable";
              guest.curStatus = "식사중";
              guest.mealTable = table.number;
            }
          }
        }
      }

      if (guest.mealTime < 60 && guest.curStatus === "식사중") {
        guest.mealTime += 1;
      } else if (guest.mealTime >= 60 && guest.curStatus === "식사중") {
        guest.curStatus = "식사완료";
        restaurant.tableConfirm[guest.mealTable].status = "available";
        if (guest.resPeople === 1) {
          restaurant.tableConfirm[guest.mealTable].chair.classList.remove("on");
        } else {
          for (let person = 0; person < guest.resPeople; person++) {
            restaurant.tableConfirm[guest.mealTable].chair[
              person
            ].classList.remove("on");
          }
        }
      }
    }
    createTable();
    if (hour >= endTime) {
      clearInterval(timer);
    }
  }, 1000);
}

function sort(key) {
  let sortedData;
  if (click) {
    click = false;
    sortedData = data.sort((a, b) =>
      a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0
    );
  } else {
    click = true;
    sortedData = data.sort((a, b) =>
      a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0
    );
  }

  let tableBodyData = [];
  for (const iterator of sortedData) {
    if (iterator.curStatus === "대기중") {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td class="waiting">${iterator.curStatus}</td>
            </tr>
        `);
    } else if (iterator.curStatus === "거절") {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td class="reject">${iterator.curStatus}</td>
            </tr>
        `);
    } else {
      tableBodyData.push(`
            <tr>
                <td>${iterator.resNum}</td>
                <td>${iterator.resPeople}</td>
                <td>${iterator.curStatus}</td>
            </tr>
        `);
    }
  }
  document.querySelector(".reservation-table > tbody").innerHTML =
    tableBodyData.join("");
}

const enterPeopleEat = document.getElementById("예약버튼");
enterPeopleEat.addEventListener("click", clickButton);

const playOpenBusiness = document.getElementById("영업개시");
playOpenBusiness.addEventListener("click", clickOpenBusiness);
