import Block from "../../utils/Block";
import template from "./chat.hbs";
import { Button, ButtonType, FormInput, InputTypeField, ChatList, ChatRoomHeader, ChatRoomContent, ChatRoomMessagePanel } from "../../components";
import { roomList } from "../../data/mock";
import { RoomType, ChildType, Pages, PageType } from "../../typings";
import { renderDom } from "../../utils/Routers";

export class Chat extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
    const chatListComponent = new ChatList({data: roomList})
    const currentRoom: RoomType | undefined = roomList.find((room: RoomType) => room.currentRoom)

    const buttonToProfile = new Button({
      label: "Профиль ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          renderDom(Pages.PROFILE)
        },
      },
      typeButton: ButtonType.LINK,
    });

    const searchField: FormInput = new FormInput({
      placeholder: "Поиск",
      inputName: "search",
      type: "text",
      className: "chat-left-field__search",
      typeField: InputTypeField.SEARCH,
      events: {
        keydown: () => {
          console.log(searchField.getValue())
        },
      },
    });

    const chatRoomHeader = new ChatRoomHeader({
      avatar: currentRoom?.avatar,
      roomName: currentRoom?.roomName
    })

    const chatRoomContent = new ChatRoomContent({
      messages: currentRoom?.messages
    });

    const chatRoomMessagePanel = new ChatRoomMessagePanel({});


    child.ChatListComponent = chatListComponent
    child.ButtonToProfile = buttonToProfile;
    child.SearchField = searchField;
    child.ChatRoomHeader = chatRoomHeader;
    child.ChatRoomContent = chatRoomContent;
    child.ChatRoomMessagePanel = chatRoomMessagePanel;

  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
