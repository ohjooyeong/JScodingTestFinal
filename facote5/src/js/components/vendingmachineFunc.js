class VendingmachineFunc {
  constructor() {
    this.btnPut = document.querySelector(".btn-put");
    this.inputCostEl = document.querySelector(".inp-put");
    this.myMoney = document.querySelector(".txt-mymoney");
    this.balance = document.querySelector(".txt-balance");
    this.itemList = document.querySelector(".list-item");
    this.btnGet = document.querySelector(".btn-return");
    this.stagedList = document.querySelector(".cont-get .list-item-staged");
    this.gotList = document.querySelector(".cont-myitems .list-item-staged");
    this.txtTotal = document.querySelector(".txt-total");
  }

  setup() {
    this.bindEvents();
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
  }
}

export default VendingmachineFunc;
