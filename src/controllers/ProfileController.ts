import store from '../utils/Store';

import { Pages, ProfileData } from '../typings';
import router from '../routing/router';
import ProfileApi from '../api/profileApi';
import { PROFILE_PAGE } from '../routing/routes';

export class ProfileController {
  private readonly api: ProfileApi;

  constructor() {
    this.api = new ProfileApi();
  }

  async update(data: ProfileData) {
    try {
      const user = await this.api.update(data);
      store.set('user.data', user);
      router.go(PROFILE_PAGE);
    } catch (error: any) {
      store.set('user.profileUpdate.error', error.reason);
    }
  }

  async changePassword(oldPassword: string, newPassword: string) 
  {
    try {
      await this.api.changePassword({
        oldPassword, newPassword
      });
      
      router.go(PROFILE_PAGE);
    } catch (error: any) {
      store.set('user.changePassword.error', error.reason);
    }
  }

  async changeAvatar(data: FormData) { 
    try {
      const user = await this.api.changeAvatar(data);
      store.set('user.data', user);
      router.go(PROFILE_PAGE);
    } catch (error: any) {
      store.set('user.changeAvatar.error', error.reason);
    }
  }

  

}

export default new ProfileController();
