import { SigninData, SignupData } from '../typings';
import store from '../utils/Store';
import router from '../routing/router';
import AuthApi from '../api/loginApi';
import { CHAT_PAGE, LOGIN_PAGE } from '../routing/routes';

export class LoginController {
  private readonly api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      router.go(CHAT_PAGE);
    } catch (error: any) {
      store.set('user.signin.error', error.reason);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(CHAT_PAGE);
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

      router.go(LOGIN_PAGE);
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

export default new LoginController();
