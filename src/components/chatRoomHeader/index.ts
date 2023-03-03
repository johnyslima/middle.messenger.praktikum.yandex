import { ChildType } from "../../typings/childType";
import Block from "../../utils/Block";
import { Button, ButtonType } from "../button";
import kebabMenuIconSvg from "../../assets/icons/kebab_menu.svg";
import template from "./chatRoomHeader.hbs";

interface ChatRoomHeaderProps {
  avatar?: string;
  roomName?: string;
}

export class ChatRoomHeader extends Block {

  constructor(props: ChatRoomHeaderProps) {
    super(props)
  }

  init() {
    let child: ChildType = this.children;

    const buttonContextMenu = new Button({
      label: "Профиль ›",
      className: "chat-room-header__name__context-menu-button",
      events: {
        click: (event: Event) => {
          console.log("here");
        },
      },
      icon: kebabMenuIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonContextMenu = buttonContextMenu

  }

  render() {
    return this.compile(template, this.props);
  }
}
