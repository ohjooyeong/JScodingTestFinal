import { Component, createComponent } from "../../../core/index.js";
import { CouponItem } from "./index.js";
/**
 * @description props로 쿠폰 데이터를 넘겨주세용
 * @param coupons[] props.coupons : 쿠폰들
 * @param boolean props.couponListToggle : 쿠폰리스트 토글
 * @param function props.onClickCouponButton : 쿠폰선택버튼 눌렀을때 이벤트
 * @param function props.onClickCoupon : 쿠폰 눌렀을때 이벤트
 */
class couponSelectBox extends Component{
    constructor(props){
        super(props);
    }
    toggleCouponList(){
        this.setState({...this.state,couponListToggle:!this.state.couponListToggle})
    }
    render(){
        const couponSelectBox = document.createElement("div");
        couponSelectBox.setAttribute("class","selectbox coupon-selectbox");

        const couponButton = document.createElement("button");
        couponButton.setAttribute("class","coupon-btn");
        couponButton.type = "button";
        couponButton.innerText = "쿠폰선택";
        couponButton.addEventListener("click",this.props.onClickCouponButton)

        const couponList = document.createElement("ul");
        couponList.setAttribute("class",`coupon-list ${this.props.couponListToggle?"on":""}`);
        if(this.props.coupons) {
            const couponItems = this.props.coupons.map(coupon => {
                return createComponent(CouponItem,{text:coupon.couponName,onClick:()=>this.props.onClickCoupon(coupon)});
            })
            couponList.append(...couponItems);
        }
        couponSelectBox.append(couponButton,couponList)
        return couponSelectBox
    }

}

export default couponSelectBox