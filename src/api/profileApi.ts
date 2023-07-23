import { ProfileChangePassword, ProfileData } from '../typings/api';
import BaseApi from './common';

export default class ProfileApi extends BaseApi 
{
    constructor() {
        super('/user');
    }

    update(data: ProfileData) {
      console.log('profileApi', this)
      console.log('profileApi', this.http)
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

    // public update(data: ProfileData): Promise<ProfileDataAvatar> {
    //     return this.http.put('/profile', data);
    // }

    // public changeAvatar(data: FormData): Promise<ProfileDataAvatar> {
    //     return this.http.put('/profile/avatar', data);
    // }

    // public changePassword(data: ProfileChangePassword): Promise<any> {
    //     return this.http.put('/password', data);
    // }

    // public searchUsers(login: string): Promise<IUserData[]> {
    //     return this.http.post('/search', {login});
    // }

    read = undefined; 
    create = undefined; 
    delete = undefined;
}
