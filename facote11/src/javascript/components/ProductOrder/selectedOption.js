import { Component, createComponent } from "../../core/index.js";
import { CloseButton } from "../Button/index.js";
import { ProductPrice } from "../Product/index.js";

class SelectedOption extends Component {
  render() {
    console.log(this.props);
    const selectedOptionItem = document.createElement("li");
    selectedOptionItem.setAttribute("class", "selected-option-item");
    const optionName = document.createElement("strong");
    optionName.setAttribute("class", "option-name");
    optionName.innerText = this.props.optionName;

    const selectedOptionQuantityInputDiv = document.createElement("div");
    selectedOptionQuantityInputDiv.setAttribute("class", "select-quantity");
    this.props.quantityInput &&
      selectedOptionQuantityInputDiv.append(this.props.quantityInput);

    const selectedOptionPrice = createComponent(ProductPrice, {
      price: this.props.optionPrice,
    });
    selectedOptionQuantityInputDiv.append(selectedOptionPrice);
    const closeButton = createComponent(CloseButton);
    closeButton.classList.add("delete-option");
    closeButton.addEventListener(
      "click",
      this.props.removeSelectedProductOption
    );

    selectedOptionItem.append(
      optionName,
      selectedOptionQuantityInputDiv,
      closeButton
    );

    return selectedOptionItem;
  }
}

export default SelectedOption;
