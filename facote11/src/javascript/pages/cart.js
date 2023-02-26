import { LinkToMain, OrderButton } from "../components/Button/index.js";
import { CartPageSection } from "../components/Cart/common/index.js";
import {
  CouponSelectBox,
  OrderItem,
  SelectedCouponList,
  OrderTable,
} from "../components/Cart/index.js";
import { Component, createComponent } from "../core/index.js";

class CartPage extends Component {
  constructor(props) {
    super(props);
    const orderData = JSON.parse(localStorage.getItem("cart"));
    this.state = {
      couponListToggle: false,
      couponList: [],
      orderData: orderData ? orderData : {},
      selectedCoupons: {},
      checkedProducts: {},
    };
    this.getCouponData();
  }

  async getCouponData() {
    const response = await fetch("http://test.api.weniv.co.kr/coupon");
    const data = await response.json();

    this.setState({ ...this.state, couponList: data });
  }
  toggleCouponList() {
    this.setState({
      ...this.state,
      couponListToggle: !this.state.couponListToggle,
    });
  }
  selectCoupon(coupon) {
    const existProduct = this.state.orderData.hasOwnProperty(coupon.productid);
    if (!existProduct) {
      alert("쿠폰을 적용할 상품이 없습니다!");
      this.setState({ ...this.state, couponListToggle: false });
      return;
    }
    const selectedCoupons = this.state.selectedCoupons;
    for (const couponId in selectedCoupons) {
      const selectedCoupon = selectedCoupons[couponId];
      if (selectedCoupon.productid === coupon.productid) {
        alert("상품당 쿠폰 하나만 적용 가능합니다!");
        this.setState({ ...this.state, couponListToggle: false });
        return;
      }
    }

    selectedCoupons[coupon.id] = coupon;
    this.setState({ ...this.state, couponListToggle: false, selectedCoupons });
  }

  filterObjectByKey(object, filterFunc) {
    return Object.keys(object)
      .filter(filterFunc)
      .reduce((prev, key) => {
        return Object.assign(prev, { [key]: object[key] });
      }, {});
  }

  cancleCoupon(couponId) {
    const filteredCoupons = this.filterObjectByKey(
      this.state.selectedCoupons,
      (key) => key !== couponId
    );
    this.setState({ ...this.state, selectedCoupons: filteredCoupons });
  }

  isSelectedAll() {
    const checkProduct = Object.keys(this.state.checkedProducts).length;

    return checkProduct === 0
      ? false
      : checkProduct === Object.keys(this.state.orderData).length;
  }
  selectAllProducts() {
    if (this.isSelectedAll()) {
      this.setState({ ...this.state, checkedProducts: {} });
    } else {
      this.setState({ ...this.state, checkedProducts: this.state.orderData });
    }
  }
  deleteProducts() {
    const selectProducts = this.filterObjectByKey(
      this.state.orderData,
      (productId) => {
        return !Object.keys(this.state.checkedProducts).includes(productId);
      }
    );
    localStorage.setItem("cart", JSON.stringify(selectProducts));
    const selectedCoupons = this.filterObjectByKey(
      this.state.selectedCoupons,
      (couponId) => {
        return !Object.keys(this.state.checkedProducts).includes(
          this.state.selectedCoupons[couponId].productid + ""
        );
      }
    );
    this.setState({
      ...this.state,
      orderData: selectProducts,
      selectedCoupons,
    });
  }

  render() {
    const cartContainer = document.createElement("main");
    cartContainer.setAttribute("class", "cart");

    const cartArticle = document.createElement("article");
    cartArticle.setAttribute("class", "cart-article");

    const headingTitle = document.createElement("h1");
    headingTitle.innerText = "장바구니/결제";

    const couponSelectBox = createComponent(CouponSelectBox, {
      couponListToggle: this.state.couponListToggle,
      coupons: this.state.couponList,
      onClickCouponButton: this.toggleCouponList.bind(this),
      onClickCoupon: this.selectCoupon.bind(this),
    });

    const selectedCouponList = createComponent(SelectedCouponList, {
      selectedCoupons: this.state.selectedCoupons,
      cancleCoupon: this.cancleCoupon.bind(this),
    });

    const couponSection = createComponent(CartPageSection, {
      sectionTitle: "쿠폰 사용",
      sectionType: "coupon-section",
      childrenEl: [couponSelectBox, selectedCouponList],
    });

    const orderProductSection = createComponent(CartPageSection, {
      sectionTitle: "주문 상품",
      sectionType: "order-section",
    });

    const orderItems = [];
    for (const productId in this.state.orderData) {
      const orderProduct = this.state.orderData[productId];
      const couponId = Object.keys(this.state.selectedCoupons).find((id) => {
        return (
          Number(this.state.selectedCoupons[id].productid) === Number(productId)
        );
      });
      const coupon = this.state.selectedCoupons[couponId];
      let optionText = `수량: ${orderProduct.quantity}개`;
      if (orderProduct.option.length > 0) {
        const options = orderProduct.option.map((option) => {
          const optionDetail = orderProduct.detail.option.find(
            (optionDetail) => optionDetail.id === option.optionId
          );
          return {
            ...optionDetail,
            quantity: option.quantity,
          };
        });
        optionText = `옵션: ${options
          .map((option) => `${option.optionName}(수량: ${option.quantity})`)
          .join(` / `)}`;
      }
      const isSelected = this.state.checkedProducts.hasOwnProperty(
        orderProduct.id
      );
      const orderItem = createComponent(OrderItem, {
        ...orderProduct.detail,
        ...this.state.selectedCoupons[couponId],
        productDiscountRate: orderProduct.detail.discountRate,
        totalPrice: orderProduct.totalPrice - (coupon ? coupon.discount : 0),
        optionText: optionText,
        isSelected: isSelected,
        onClickBox: () => {
          if (isSelected) {
            const filteredProducts = this.filterObjectByKey(
              this.state.checkedProducts,
              (key) => key !== productId
            );
            this.setState({ ...this.state, checkedProducts: filteredProducts });
          } else {
            this.setState({
              ...this.state,
              checkedProducts: {
                ...this.state.checkedProducts,
                [productId]: orderProduct,
              },
            });
          }
        },
      });
      orderItems.push(orderItem);
    }

    const orderTable = createComponent(OrderTable, {
      isSelectedAll: this.isSelectedAll(),
      selectAllProducts: this.selectAllProducts.bind(this),
      selectedCoupons: this.state.selectedCoupons,
      orderData: this.state.orderData,
      onClickDeleteButton: this.deleteProducts.bind(this),
      childrenEl: orderItems,
    });
    orderProductSection.append(orderTable);
    const orderButton = createComponent(OrderButton, {
      text: "선택 상품 주문하기",
    });
    const homeButton = createComponent(LinkToMain);

    cartArticle.append(
      headingTitle,
      couponSection,
      orderProductSection,
      orderButton
    );
    cartContainer.append(cartArticle, homeButton);
    return cartContainer;
  }
}

export default CartPage;
