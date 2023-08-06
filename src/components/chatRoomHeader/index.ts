import { ChildType } from "../../typings/childType";
import Block from "../../utils/Block";
import { Button, ButtonType } from "../button";
import kebabMenuIconSvg from "../../assets/icons/kebab_menu.png";
import addUserIconSvg from "../../assets/icons/add_user.png";
import removeUserIconSvg from "../../assets/icons/remove_user.png";
import template from "./chatRoomHeader.hbs";
import Tooltip from "../tootlip";
import defaultUserAvatarUrl from "../../assets/images/default_user.png";
import TooltipAction from "../tooltipAction";
import store, { withStore } from "../../utils/Store";
import { Modal } from "../modal";
import { Form } from "../form";
import { FormInput } from "../input";
import ChatsController from "../../controllers/ChatsController";
import { ChatData, Url } from "../../typings";

interface ChatRoomHeaderProps {
  avatar?: SVGElement;
  roomName?: string;
}

class ChatRoomHeader extends Block {
  constructor(props: ChatRoomHeaderProps) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;

    const inputForModal = new FormInput({
      placeholder: "Введите логин пользователя",
      inputName: "create_chat",
      type: "text",
      typeField: "text",
    });

    const modalAction = new Modal({
      title: "",
      visible: "hide",
      events: {
        click: (event: Event) => {
          const target = event.target as HTMLElement;
          if (target.matches(".modal-wrap-background")) {
            modalAction.closeModal();
          }
        },
      },
    });

    const mediaAction = new Tooltip({
      visible: "hide",
      className: "chat-room-header__name__context-menu-tooltip",
      actions: [
        new TooltipAction({
          icon: addUserIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Добавить пользователя",
          events: {
            click: () => {
              modalAction.setProps({
                title: "Добавить пользователя",
                body: new Form({
                  className: "modal__form-change-avatar",
                  formBody: inputForModal,
                  formFooterButton: new Button({
                    label: "Добавить",
                    className: "button button--primary",
                    events: {
                      click: async (event: Event) => {
                        event.preventDefault();
                        const login = inputForModal.getValue() as string;
                        await ChatsController.addUserToChat(
                          login,
                          this.props.selectedChat
                        );
                        modalAction.closeModal();
                      },
                    },
                    typeButton: ButtonType.PRIMARY,
                  }),
                }),
              });
              modalAction.openModal();
            },
          },
        }),
        new TooltipAction({
          icon: removeUserIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Удалить пользователя",
          events: {
            click: () => {
              modalAction.setProps({
                title: "Удалить пользователя",
                body: new Form({
                  className: "modal__form-change-avatar",
                  formBody: inputForModal,
                  formFooterButton: new Button({
                    label: "Удалить",
                    className: "button button--primary",
                    events: {
                      click: async (event: Event) => {
                        event.preventDefault();
                        const login = inputForModal.getValue() as string;
                        await ChatsController.addUserToChat(
                          login,
                          this.props.selectedChat
                        );
                        modalAction.closeModal();
                      },
                    },
                    typeButton: ButtonType.PRIMARY,
                  }),
                }),
              });
              modalAction.openModal();
            },
          },
        }),
        new TooltipAction({
          icon: removeUserIconSvg,
          iconClassName: " ib-22px primary-color",
          text: "Удалить чат",
          events: {
            click: async (event: Event) => {
              event.preventDefault();
              await ChatsController.deleteChat(this.props.selectedChat);
              store.set("selectedChat", undefined);
            },
          },
        }),
      ],
      events: {
        click: (event: Event) => {
          event.stopPropagation();
          const target = event.target as HTMLElement;
          if (!target.matches(".tooltip-wrap")) {
            mediaAction.closeModal();
          }
        },
      },
    });

    const buttonContextMenu = new Button({
      className: "chat-room-header__name__context-menu-button",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          mediaAction.openModal();
        },
      },
      icon: kebabMenuIconSvg,
      typeButton: ButtonType.ICON,
    });

    child.ButtonContextMenu = buttonContextMenu;
    child.TooltipMenuChatRoomContext = mediaAction;
    child.ModalContext = modalAction;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withStateToProps = withStore((state) => {
  const selectedChatId = state.selectedChat;
  const currentChat: ChatData = state.chats.filter(
    (item: ChatData) => item.id === selectedChatId
    )[0];

  return {
    selectedChat: state.selectedChat,
    roomName: currentChat?.title || "",
    avatar: currentChat?.avatar ? `${Url.RESOURCE}${currentChat.avatar}` : defaultUserAvatarUrl,
  };
});

export default withStateToProps(ChatRoomHeader as typeof Block);
