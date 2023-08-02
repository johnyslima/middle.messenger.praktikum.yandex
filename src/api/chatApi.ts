import { ChatData } from '../typings';
import BaseApi from './common';

export default class ChatsApi extends BaseApi
{
    constructor() {
        super('/chats');
    }

    public create(data: {title: string}): Promise<unknown> {
        return this.http.post('/', data);
    }
    
    public read(): Promise<ChatData[]> {
        return this.http.get('/');
    }

    public async getToken(id: number): Promise<string> {
        const response: any = await this.http.post(`/token/${id}`);
        return response.token;
    }

    public addUserToChat(userId: number, chatId: number) {
        return this.http.put('/users', {
            users: [
                userId
            ], 
            chatId
        })
    }

    public deleteUserFromChat(userId: number, chatId: number) {
        return this.http.delete('/users', {
            users: [
                userId
            ], 
            chatId
        })
    }

    public delete(chatId: number) {
        return this.http.delete('/', {chatId})
    }

    update = undefined; 
}
