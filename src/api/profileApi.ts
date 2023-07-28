import { ProfileChangePassword, ProfileData } from '../typings/api';
import BaseApi from './common';

export default class ProfileApi extends BaseApi 
{
    constructor() {
        super('/user');
    }

    update(data: ProfileData) {
      return this.http.put('/profile', data);
    }
  
    changePassword(data: ProfileChangePassword) {
      return this.http.put('/password', data);
    }
  
    changeAvatar(data: FormData) {
      return this.http.put('/profile/avatar', data);
    }
  
    searchUsers(login: string) {
      return this.http.post('/search', { login });
    }

    read = undefined; 
    create = undefined; 
    delete = undefined;
}
