export type MessageType = {
  type: string;
  messageText: string;
}


export type RoomType = {
  id?: string | number;
  avatar?: any;
  roomName?: string;
  lastMessage?: string;
  countUnread: number;
  lastMessageFromYou: boolean;
  time?: string;
  currentRoom: boolean;
  messages?: MessageType[];
}

