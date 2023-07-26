import Block from "../../utils/Block";
import template from "./avatar.hbs";
import { Modal } from "../modal";
import emptyPictIconSvg from "../../assets/icons/empty_pict.svg";
import { Button, ButtonType } from "../button";
import addIconSvg from "../../assets/icons/add_icon.svg";

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
      // img: emptyPictIconSvg,
      img: this.props.img || emptyPictIconSvg,
    });
  }
}
