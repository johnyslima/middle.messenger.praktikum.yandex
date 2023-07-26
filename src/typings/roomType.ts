export interface IFile {
  content_size: number;
  content_type: string;
  filename: string;
  id: number;
  path: string;
  upload_date: string;
  user_id: number;
}


export type MessageType = {
  chat_id: number;
  content: string;
  file?: IFile | null;
  id: number;
  is_read: true;
  time: string;
  type: string;
  user_id: number;
}


export type RoomType = {
  id?: string | number;
  avatar?: SVGElement;
  title?: string;
  last_message?: string;
  unread_count?: number;
  created_by?: number;
  lastMessageFromYou?: boolean;
  time?: string;
  currentRoom?: boolean;
  messages?: MessageType[];
  events?: {
    click: (event: Event) => void;
  };
  selectedChat: number;
}

