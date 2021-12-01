class VendingmachineFunc {
  constructor() {
    this.btnReturn = document.querySelector(".btn-return");
    this.btnPut = document.querySelector(".btn-put");
    this.inputCostEl = document.querySelector(".inp-put");
    this.myMoney = document.querySelector(".txt-mymoney");
    this.balance = document.querySelector(".txt-balance");
    this.itemList = document.querySelector(".list-item");
    this.btnGet = document.querySelector(".btn-get");
    this.stagedList = document.querySelector(".cont-get .list-item-staged");
    this.gotList = document.querySelector(".cont-myitems .list-item-staged");
    this.txtTotal = document.querySelector(".txt-total");
  }

  setup() {
    this.bindEvents();
  }

  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;

    stagedItem.innerHTML = `
        <img src="./src/images/${target.dataset.img}" alt="${target.dataset.item}" class="img-item" />
        <strong class="txt-item">${target.dataset.item}</strong>
        <span class="num-counter">1</span>
    `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    // 1. 입금 버튼 기능
    /*
        입금액을 입력하고 입금 버튼을 누르면 소지금 = 소지금 - 입금액. 잔액 = 잔액 + 입금액
        입금액이 소지금보다 많다면 실행을 중단하고 "소지금이 부족합니다." 라고 쓰인 경고 창을 띄웁니다.
        입금액 인풋창은 초기화 됩니다.
    */
    this.btnPut.addEventListener("click", () => {
      const inputCost = parseInt(this.inputCostEl.value);
      //   parseInt는 스트링문자를 만나기 전까지의 숫자문자열을 숫자로 변경해줌 (스트링문자 만나면 중지하고 그전까지의 숫자값 반환)
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(",", ""));
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));

      if (inputCost) {
        if (inputCost <= myMoneyVal) {
          this.myMoney.innerText =
            new Intl.NumberFormat().format(myMoneyVal - inputCost) + "원";
          this.balance.innerText =
            new Intl.NumberFormat().format(
              (balanceVal ? balanceVal : 0) + inputCost
            ) + "원";
          this.inputCostEl.value = null;
        } else {
          alert("소지금이 부족합니다.");
          this.inputCostEl.value = null;
        }
      }
    });

    /*
        2. 거스름돈 반환 버튼 기능
        반환 버튼을 누르면 소지금 = 소지금 + 잔액이 됩니다.
        잔액창은 초기화 됩니다.
    */

    this.btnReturn.addEventListener("click", () => {
      const myMoneyVal = parseInt(this.myMoney.innerText.replace(",", ""));
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));

      if (balanceVal) {
        this.myMoney.innerText =
          new Intl.NumberFormat().format(myMoneyVal + balanceVal) + "원";
        this.balance.innerText = "0원";
      }
    });

    /*
        3. 아이템 리스트 기능
        아이템을 누르면 잔액 = 잔액 - 음료수 가격
        아이템이 획득 가능창에 등록됩니다.
        아이템 버튼의 data-count - 1
        만약 data-count 값이 0이 된다면 li 에 sold-out
        아이템 가격보다 잔액이 적다면 "잔액이 부족합니다" 경고창이 나타납니다.
        이미 선택했던 음료수를 또 선택하는 경우 음료수의 카운터를 올려줍니다.
    */
    this.itemList.addEventListener("click", (e) => {
      const targetEl = e.target;
      const balanceVal = parseInt(this.balance.innerText.replace(",", ""));
      const targetElBtn = targetEl.querySelector(".btn-item");
      let isStaged = false; // 이미 선택했었는가?

      if (targetEl.tagName === "LI") {
        const targetElPrice = parseInt(targetElBtn.dataset.price);
        if (balanceVal >= targetElPrice) {
          this.balance.innerText =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + "원";
          if (this.stagedList.querySelectorAll("li").length > 0) {
            this.stagedList.querySelectorAll("li").forEach((item) => {
              //   이미 선택한 음료수가 내가 클릭한 음료수인지 탐색
              if (item.dataset.item === targetElBtn.dataset.item) {
                item.querySelector(".num-counter").innerText++;
                isStaged = true;
                return;
              }
            });

            if (!isStaged) {
              // 해당 아이템을 처음 선택했을 경우
              this.stagedItemGenerator(targetElBtn);
            }
          } else {
            this.stagedItemGenerator(targetElBtn);
          }
          targetElBtn.dataset.count--;
          if (targetElBtn.dataset.count == 0) {
            targetEl.classList.add("sold-out");
          }
        } else {
          alert("잔액이 부족합니다");
        }
      }
    });

    /*
        4. 획득 버튼 기능
        획득 버튼을 누르면 선택한 음료수 목록이 획득한 음료 목록으로 이동합니다.
        획득한 음료의 금액을 모두 합하여 총 금액을 업데이트합니다.
        선택한 음료수 목록은 초기화 됩니다.
    */

    this.btnGet.addEventListener("click", () => {
      let totalPrice = 0;
      let isGot = false;

      this.stagedList.querySelectorAll("li").forEach((itemStaged) => {
        this.gotList.querySelectorAll("li").forEach((itemGot) => {
          let itemGotCount = itemGot.querySelector(".num-counter");
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            itemGotCount.innerText =
              parseInt(itemGotCount.innerText) +
              parseInt(itemStaged.querySelector(".num-counter").innerText);
            this.stagedList.removeChild(itemStaged);
            isGot = true;
            return;
          }
        });
        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
      });
      //   획득한 음료 리스트를 순환하면서 총 금액을 계산합니다.
      this.gotList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice =
          totalPrice +
          itemGot.dataset.price *
            parseInt(itemGot.querySelector(".num-counter").innerText);
      });
      this.txtTotal.innerText = `총금액 : ${new Intl.NumberFormat().format(
        totalPrice
      )}원`;
    });
  }
}

export default VendingmachineFunc;
