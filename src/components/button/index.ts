import Block from "../../utils/Block";
import template from "./button.hbs";
import templateIcon from "./buttonIcon.hbs";
import templateLink from "./buttonLink.hbs";

export enum ButtonType {
  PRIMARY = "primary-button",
  ICON = "icon-button",
  LINK = "link-button",
}
interface ButtonProps {
  label?: string;
  events?: {
    click: (event: Event) => void;
  };
  className?: string;
  icon?: SVGElement;
  typeButton?: string;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props, typeButton: props.typeButton ?? ButtonType.PRIMARY });
  }

  private getTemplate() {
    switch (this.props.typeButton) {
      case ButtonType.PRIMARY:
        return template;
        break;
      case ButtonType.ICON:
        return templateIcon;
        break;
      case ButtonType.LINK:
        return templateLink;
        break;
      default:
        return template;
        break;
    }
  }

  render() {
    return this.compile(this.getTemplate(), this.props);
  }
}
