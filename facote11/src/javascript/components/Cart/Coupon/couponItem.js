import { Component } from "../../../core/index.js";

class CouponItem extends Component{
    render(){
        const couponItem = document.createElement("LI");
        couponItem.setAttribute("class", "coupon-item");
        couponItem.innerText = this.props.text;
        couponItem.addEventListener("click",this.props.onClick);
        return couponItem
    }
}

export default CouponItem