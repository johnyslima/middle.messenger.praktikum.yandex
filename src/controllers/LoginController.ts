// import LoginAPI from '../api';
import { Pages, SigninData, SignupData } from '../typings';
import store from '../utils/Store';
import router from '../routing/router';
import { AuthApi } from '../api/loginApi';
// import API, { AuthAPI, SigninData, SignupData } from '../api/loginApi';

export class LoginController {
  private readonly api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signin(data: SigninData) {
    console.log('data', data)
    try {
      console.log('this.api', this.api)
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

  // async fetchUser() {
  //   console.log('fetchUser store', store);
  //     store.set('user.isLoading', true);
  //     const user: any = await this.api.getUser();
  //     store.set('user.data', user);
  //     store.set('user.isLoading', false);
  //     console.log('fetchUser end store', store)
  // }

  async fetchUser() {
    // try {
    //   store.set('user.isLoading', true);
    //   const user = await this.api.getUser();

    //   store.set('user.data', user);
    //   store.set('user.isLoading', false);
    // } catch (error:any) {
    //   console.log(error.reason);
    // }
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
