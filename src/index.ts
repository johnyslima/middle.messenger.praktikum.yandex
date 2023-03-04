import "./style/index.pcss";
import "./components";

// import { renderDom } from './utils/Routers'
import Router from "./routing/router";
import {
  Login,
  SignUp,
  Profile,
  Chat,
  Error404,
  Error500,
  Main,
} from "./pages/";

const router = new Router("#root");
console.log("router", router);
router
  .use("/", Main)
  .use("/login", Login)
  .use("/signUp", SignUp)
  .use("/profile", Profile)
  .use("/chat", Chat)
  .use("/404", Error404)
  .use("/500", Error500)
  .start();

// window.addEventListener("DOMContentLoaded", () => {
//   console.log('here')
//   // renderDom('main');
//   // renderDom('login');
//   // renderDom('error404');
//   // render('profile');
//   // render('profileEdit');
//   // render('profileChangePassword');
//   // render('signUp');
//   // renderDom('login');
// });
