import Block from "../../utils/Block";
import template from "./modal.hbs";

interface ModalProps {
  visible?: string;
  className?: string;
  actions?: Block[];
  events?: {
    click: (event: Event) => void;
  };
  title: string;
  body?: any;
  action?: Block;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    if (newProps.body && newProps.body instanceof Block) {
      this.children.body = newProps.body;
    }

    return true;
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
