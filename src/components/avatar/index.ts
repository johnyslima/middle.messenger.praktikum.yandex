import Block from "../../utils/Block";
import template from "./avatar.hbs";
import emptyPictIconSvg from "../../assets/icons/empty_pict.svg";

interface AvatarProps {
  nameUser: string;
  events?: {
    click: (event: Event) => void;
  };
  className?: string;
  img?: SVGElement | string;
  changeAvatarBtn?: Block;
  isEdit?: boolean;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      img: this.props.img || emptyPictIconSvg,
    });
  }
}
