import { ChildType, RoomType } from "../../typings";
import Block from "../../utils/Block";
import { ChatListItem } from "../chatListItem";
import template from "./chatList.hbs";

interface ChatListProps {
  data: RoomType[];
}

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  init() {
    let child: ChildType = this.children;
    const rooms = this.props.data.map(
      (room: RoomType) =>
        new ChatListItem({
          avatar: room.avatar,
          roomName: room.roomName,
          lastMessage: room.lastMessage,
          countUnread: room.countUnread,
          lastMessageFromYou: room.lastMessageFromYou,
          time: room.time,
          currentRoom: room.currentRoom,
        })
    );

    child.ChatsList = rooms;
  }

  render() {
    return this.compile(template, this.props);
  }
}
