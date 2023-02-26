import { Component } from "../../../core/index.js";
/**
 * @description props로 타이틀과 자식요소를 넣어 사용합시다!
 * @param string props.sectionTittle
 * @param HTMLElement[] props.childrenEl
 * @param string props.sectionType:섹션타입 스타일을 위한 클래스
 */
class CartPageSection extends Component{
    render(){
        const couponSection = document.createElement("section");
        couponSection.setAttribute("class", this.props.sectionType);

        const sectionTitle = document.createElement("H2");
        sectionTitle.setAttribute("class", "section-title");
        sectionTitle.innerText = this.props.sectionTitle;
        couponSection.append(sectionTitle)
        if (!this.props.childrenEl) return couponSection
        
        couponSection.append(...this.props.childrenEl)
        return couponSection
    }

}

export default CartPageSection