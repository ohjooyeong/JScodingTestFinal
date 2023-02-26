import { Component, createComponent } from '../../../core/index.js';
import { CloseButton } from '../../Button/index.js';


class SelectedCoupon extends Component {
    render() {
        const selectedCouponItem = document.createElement("LI");
        selectedCouponItem.setAttribute("class", "selected-coupon-item");

        const couponName = document.createElement("STRONG");
        couponName.setAttribute("class", "coupon-name");
        couponName.innerText = this.props.coupon.couponName;

        const closeButton = createComponent(CloseButton, {});
        closeButton.classList.add("delete-coupon");

        closeButton.addEventListener("click", this.props.cancleCoupon);
        selectedCouponItem.append(couponName, closeButton);

        return selectedCouponItem;
    }
}

export default SelectedCoupon