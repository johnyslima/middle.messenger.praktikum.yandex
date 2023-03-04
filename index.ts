import "./src/style/index.pcss";
import "./src/components";

import { renderDom } from './src/utils/Routers'

window.addEventListener("DOMContentLoaded", () => {
  renderDom('main');
  // renderDom('login');
  // renderDom('error404');
  // render('profile');
  // render('profileEdit');
  // render('profileChangePassword');
  // render('signUp');
  // renderDom('login');
});
