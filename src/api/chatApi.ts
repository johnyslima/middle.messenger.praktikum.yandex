import BaseApi from './common';

export default class ChatsApi extends BaseApi
{
    constructor() {
        super('/chats');
    }

    public create(data: {title: string}) {
        return this.http.post('/', data);
    }
    
    public read() {
        return this.http.get('/');
    }

    public async getToken(id: number) {
        const response = await this.http.post(`/token/${id}`);
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
