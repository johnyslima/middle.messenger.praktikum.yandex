import { ChildType, RoomType } from "../../typings";
import Block from "../../utils/Block";
import { ChatListItem } from "../chatListItem";
import template from "./chatList.hbs";
import defaultUserAvatarUrl from '../../assets/images/default_user.png';
import ChatsController from "../../controllers/ChatsController";
import { DateFormat } from "../../helpers/DateFormat";
import { withStore } from "../../utils/Store";

interface ChatListProps {
  data: RoomType[];
  selectedChat: number;
}

class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    if(!!newProps.chats) {
      let child: ChildType = this.children;
        const rooms = newProps.chats.map(
          (room: RoomType) =>{
            return new ChatListItem({
              ...room,
              avatar: room.avatar || defaultUserAvatarUrl,
              last_message: room?.last_message?.content,
              time: DateFormat(room?.last_message?.time),
              currentRoom: room?.id === this.props.selectedChat,
              events: {
                click: () => {
                  ChatsController.selectChat(room?.id);
                }
              }
        })
      }
    );

      child.ChatsList = rooms;
      return true;
    }
    return false;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withStateToProps = withStore((state) => ({
  chats: [...(state.chats || [])], 
  selectedChat: state.selectedChat
}));

export default withStateToProps(ChatList as typeof Block);
