import Block from "../../utils/Block";
import template from "./chat.hbs";
import { 
  Button, 
  ButtonType, 
  FormInput, 
  InputTypeField, 
  ChatList, 
  ChatRoomHeader, 
  ChatRoomContent, 
  ChatRoomMessagePanel, 
  Modal, 
  Form } from "../../components";
import { ChildType, PageType } from "../../typings";
import router from "../../routing/router";
import ChatsController from "../../controllers/ChatsController";
import { withStore } from "../../utils/Store";
import { EmptyRoom } from "../../components/emptyRoom";

class Chat extends Block {
  constructor(props?: PageType) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;

    ChatsController.fetchChats();

    const buttonCreateChat = new Button({
      label: "Создать чат",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
            modalAction.openModal()
          // router.go('/profile');
          // renderDom(Pages.PROFILE)
        },
      },
      typeButton: ButtonType.LINK,
    });


    const buttonToProfile = new Button({
      label: "Профиль ›",
      className: "chat-left-field__profile-link",
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/profile');
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

    const modalAction = new Modal({
      title: "Создать чат",
      visible: "hide",
      body: new Form({
        className: "modal__form-change-avatar",
        events: {
          submit: (event: Event) => {
            event.preventDefault();
          },
        },
        formBody: new FormInput({
          placeholder: "Введите название чата",
          inputName: "create_chat",
          type: "text",
          typeField: "text",
          // events: {
          //   focusout: () => {
          //     loginField.isValid(LoginValidator);
          //   },
          // },
        }),
        formFooterButton: new Button({
            label: "Создать",
            className: "button button--primary",
            events: {
              click: (event: Event) => {
                event.preventDefault();
                const input = modalAction.children.body.children.formBody as FormInput;
                const chatName = input.getValue() as string;
                ChatsController.create(chatName);
                modalAction.closeModal()
              },
            },
            typeButton: ButtonType.PRIMARY,
          })
      }),
      events: {
        click: (event: Event) => {
          event.stopPropagation();
          const target = event.target as HTMLElement;
          if(target.matches('.modal-wrap-background')) {
            modalAction.closeModal()
          }
        },
      },
  });
    child.ChatListComponent = new ChatList({})
    child.ButtonCreateChat = buttonCreateChat;
    child.ButtonToProfile = buttonToProfile;
    child.ChatRoomContent = new EmptyRoom();
    child.SearchField = searchField;
    child.ModalContext = modalAction;

  }

    protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
      let child: ChildType = this.children;
      if(newProps.selectedChat) {
        child.ChatRoomHeader = new ChatRoomHeader({});
        child.ChatRoomContent = new ChatRoomContent({});
        child.ChatRoomMessagePanel = new ChatRoomMessagePanel({});
        return true;}
    return false;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withStateToProps = withStore((state) => ({
  selectedChat: state.selectedChat
}));

export default withStateToProps(Chat as typeof Block);
