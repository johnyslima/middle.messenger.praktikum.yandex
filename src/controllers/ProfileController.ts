import store from '../utils/Store';

import { Pages, ProfileData } from '../typings';
import router from '../routing/router';
import ProfileApi from '../api/profileApi';

export class ProfileController {
  private readonly api: ProfileApi;

  constructor() {
    this.api = new ProfileApi();
  }

  async update(data: ProfileData) {
    try {
      const user = await this.api.update(data);
      store.set('user.data', user);
      router.go(Pages.PROFILE);
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
      
      router.go(Pages.PROFILE);
    } catch (error: any) {
      store.set('user.changePassword.error', error.reason);
    }
  }

  async changeAvatar(data: FormData) { 
    try {
      for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      const user = await this.api.changeAvatar(data);
      console.log(user)
      store.set('user.data', user);
      router.go(Pages.PROFILE);
    } catch (error: any) {
      store.set('user.changeAvatar.error', error.reason);
    }
  }

  

}

export default new ProfileController();
