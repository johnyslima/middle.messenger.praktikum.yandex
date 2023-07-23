// import LoginAPI from '../api';
import { Pages, SigninData, SignupData } from '../typings';
import store from '../utils/Store';
import router from '../routing/router';
import AuthApi from '../api/loginApi';
// import API, { AuthAPI, SigninData, SignupData } from '../api/loginApi';

export class LoginController {
  private readonly api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signin(data: SigninData) {
    // console.log('data', data)
    console.log('here', data)
    console.log('here', this)
    console.log('here', this.api)
    try {
      // console.log('this.api', this.api)
      await this.api.signin(data);
      await this.fetchUser();
      router.go(Pages.PROFILE);
    } catch (error: any) {
      store.set('user.signin.error', error.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Pages.PROFILE);
    } catch (error: any) {
      store.set('user.signup.error', error.reason);
    }
  }

  async fetchUser() {
    const user = await this.api.getUser();
    store.set('user.data', user);
  }

  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

export default new LoginController();
