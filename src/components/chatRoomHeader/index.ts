import { ChildType } from "../../typings/childType";
import Block from "../../utils/Block";
import { Button, ButtonType } from "../button";
import kebabMenuIconSvg from "../../assets/icons/kebab_menu.svg";
import addUserIconSvg from "../../assets/icons/add_user.svg";
import removeUserIconSvg from "../../assets/icons/remove_user.svg";
import template from "./chatRoomHeader.hbs";
import Tooltip from "../tootlip";
import photoAttachIconSvg from "../../assets/icons/photo_attach.svg";
import TooltipAction from "../tooltipAction";

interface ChatRoomHeaderProps {
  avatar?: SVGElement;
  roomName?: string;
}

export class ChatRoomHeader extends Block {
  constructor(props: ChatRoomHeaderProps) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;

    const mediaAction = new Tooltip({
      state: {
        show: false,
      },
      className: "chat-room-header__name__context-menu-tooltip",
      actions: [
        new TooltipAction({
          icon: addUserIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Добавить пользователя",
          events: {
            click: () => {
              // this._modal.setProps({
              //     title: 'Отправить Фото или Видео',
              //     state: 'show',
              //     body: new Browse({
              //         onSubmit: (e: SubmitEvent) => {
              //             console.log('Отправить Фото или Видео')
              //         }
              //     })
              // })
              console.log("Добавить пользователя");
            },
          },
        }),
        new TooltipAction({
          icon: removeUserIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Удалить пользователя",
          events: {
            click: () => {
              // this._modal.setProps({
              //     title: 'Отправить Фото или Видео',
              //     state: 'show',
              //     body: new Browse({
              //         onSubmit: (e: SubmitEvent) => {
              //             console.log('Отправить Фото или Видео')
              //         }
              //     })
              // })
              console.log("Удалить пользователя");
            },
          },
        }),
      ],
    });

    const buttonContextMenu = new Button({
      className: "chat-room-header__name__context-menu-button",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          console.log("buttonContextMenu");
          const { state } = mediaAction.getProps();
        console.log('state', state)
        mediaAction.setProps({
                state: {
                  show: state.show ? false : true
                }
                // state: state === 'display-block' ? 'display-none' : 'display-block'
            })
        },
      },
      icon: kebabMenuIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonContextMenu = buttonContextMenu;
    child.TooltipMenuChatRoomContext = mediaAction;
  }

  render() {
    return this.compile(template, this.props);
  }
}
