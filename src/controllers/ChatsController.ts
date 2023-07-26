import ChatsApi from '../api/chatApi';
import ProfileApi from '../api/profileApi';
import { IUserData } from '../typings';
import store from '../utils/Store';
import MessagesController from './MessagesController';

export interface IResult {
  status: string;
  msg: string;
}

export class ChatsController {

  private readonly api: ChatsApi;
  private readonly profileApi: ProfileApi;


  constructor() {
    this.api = new ChatsApi();
    this.profileApi = new ProfileApi();
  }

  async fetchChats() {
    try {
      const chats: any = await this.api.read();
      
      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);
        
        await MessagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

  async create(title: string) {
    try {
        await this.api.create({title});
        this.fetchChats();
    } catch (e: any) {
      store.set('chats.error', e.reason);
    }
  }

  getToken(id: number) {
    return this.api.getToken(id); 
  }

  async getLoginId(login: string)
  {
    const users = await this.profileApi.searchUsers(login);
    const user = users.filter((user: IUserData) => user.login === login);
    if(!user) {
      throw new Error('Пользователь с таким логимом не найден!');
    }

    return (user[0] as IUserData).id;
  }

  async addUserToChat(login: string, chatId: number): Promise<IResult> {
    try {  
      const userId = await this.getLoginId(login);
      await this.api.addUserToChat(userId, chatId);
      return {
        status: 'success',
        msg: 'Пользователь добавлен'
      };
    } catch (e: any) {
      return {
        status: 'error',
        msg: `Не найден пользователь с "${login}" таким логином!`
      }
    }
  }

  async deleteUserFromChat(login: string, chatId: number): Promise<IResult> {
    try {
      const userId = await this.getLoginId(login);
      await this.api.deleteUserFromChat(userId, chatId);
      return {
        status: 'success',
        msg: 'Пользователь добавлен'
      };
    } catch (e: any) {
      return {
        status: 'error',
        msg: `Не найден пользователь с "${login}" таким логином!`
      }
    }
  }

  async deleteChat(chatId: number): Promise<IResult> {
    try {
      console.log('chatId', chatId, this.api)
      await this.api.delete(chatId);
      this.fetchChats();
      return {
        status: 'success',
        msg: ''
      }
    } catch (e: any) {
      return {
        status: 'error',
        msg: e.reason
      }
    }
  }

  selectChat(chat: any) {
    store.set('selectedChat', chat);
  }

}

export default new ChatsController();
