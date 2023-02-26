
import { Component, createComponent } from "../../../core/index.js";
import { SelectedCoupon } from "./index.js";
/**
 * @description props로 선택된 쿠폰 데이터를 넘겨주세용
 * @param coupons[] props.selectedCoupons : 선택된 쿠폰들
 * @param funtion props.cancleCoupon : x버튼을 눌렀을때 실행할 이벤트
 */
class SelectedCouponList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const selectedCouponList = document.createElement("ul");
        selectedCouponList.setAttribute("class", "selected-coupon");
        if(this.props.selectedCoupons){
            const selectedCouponsKeys = Object.keys(this.props.selectedCoupons);
            const selectedCoupons = selectedCouponsKeys.map(key=>{
                    const selectedCoupon = createComponent(SelectedCoupon,{
                        id:key,
                        coupon: this.props.selectedCoupons[key], 
                        cancleCoupon:()=>this.props.cancleCoupon(key)})
                    return selectedCoupon
            })
            selectedCouponList.append(...selectedCoupons)
        }
        return selectedCouponList
    }

}

export default SelectedCouponList
