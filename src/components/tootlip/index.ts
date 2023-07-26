import Block from "../../utils/Block";
import template from "./tooltip.hbs";

interface TootlipProps {
  visible?: string;
  className?: string;
  actions?: Block[];
  events?: {
    click: (event: Event) => void;
  };
}

export default class Tooltip extends Block {
  constructor(props: TootlipProps) {
    super(props);
  }

  public openModal(): void {
    this.setProps({
      visible: "show",
    });
  }

  public closeModal(): void {
    this.setProps({
      visible: "hide",
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
