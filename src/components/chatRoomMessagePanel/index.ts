import { ChildType } from "../../typings";
import Block from "../../utils/Block";
import { Button, ButtonType } from "../button";
import addIconSvg from "../../assets/icons/add_icon.svg";
import arrowRightIconSvg from "../../assets/icons/arrow_right.svg";
import template from "./chatRoomMessagePanel.hbs";
import { FormInput, InputTypeField } from "../input";
import { MessageValidator, NameValidator } from "../../validators";

interface ChatRoomHeaderProps {
  avatar?: string;
  roomName?: string;
}

export class ChatRoomMessagePanel extends Block {

  constructor(props: ChatRoomHeaderProps) {
    super(props)
  }

  init() {
    let child: ChildType = this.children;
    
    const buttonAttachment = new Button({
      className: "chat-room-header__name__context-menu-button",
      events: {
        click: (event: Event) => {
          console.log("buttonAttachment");
        },
      },
      icon: addIconSvg,
      typeButton: ButtonType.ICON,
    });

    const messageEnterField = new FormInput({
      placeholder: "Старый пароль",
      inputName: "message",
      type: "text",
      typeField: InputTypeField.MESSAGE_ENTER,
      editable: true,
      className: "message-enter"
    });

    const buttonMessageSend = new Button({
      className: "message-send",
      events: {
        click: (event: Event) => {
          if(!messageEnterField.isValid(MessageValidator)) {
            console.error('Поле не должно быть пустым')
            return
          }
          console.log(messageEnterField.getValue())
        },
      },
      icon: arrowRightIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonAttachment = buttonAttachment;
    child.InputMessageField = messageEnterField;
    child.ButtonMessageSend = buttonMessageSend;

  }

  render() {
    return this.compile(template, this.props);
  }
}
