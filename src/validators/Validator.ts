import Block from "../utils/Block";
import { ErrorTextType } from "./errorText";

export class Validator {
  protected component: Block;
  public value: string = "";

  constructor(value: string, component: Block) {
    this.value = value;
    this.component = component;
  }

  protected static addError(component: Block, errorText: ErrorTextType): void {
    const errorSelector = document.querySelector(
      `#${component.element?.id}_error`
    );
    if (!errorSelector) {
      const errorDiv = document.createElement("div");
      errorDiv.classList.add("error-valid");
      
      errorDiv.textContent = errorText;
      errorDiv.id = `${component.element?.id}_error`;
      component?.element?.insertAdjacentElement("afterend",errorDiv);
    } else {
      errorSelector.textContent = errorText;
    }
  }

  protected static addErrorPassword(
    componentFirst: Block,
    componentSecond: Block,
    errorText: ErrorTextType
  ): void {
    this.addError(componentSecond, errorText);
    componentFirst.element?.firstElementChild?.classList.add("error-valid");
    componentSecond.element?.firstElementChild?.classList.add("error-valid");
  }

  protected static removeError(component: Block): void {
    const nodeWithError = document.querySelector(`#${component.element?.id}_error`)
    if (nodeWithError) nodeWithError.remove() 
  }

  protected static removeErrors(): void {
    const nodesWithError = document.querySelectorAll(`.error-valid`);
    if (nodesWithError) {
      nodesWithError.forEach((node: Element) => {
        node.classList.remove("error-valid")
      })
    }
  }
}
