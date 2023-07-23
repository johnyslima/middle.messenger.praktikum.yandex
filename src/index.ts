import "./style/index.pcss";
import "./components";

// import { renderDom } from './utils/Routers'
import Router from "./routing/router";
import {
  Login,
  SignUp,
  ProfilePage,
  Chat,
  Error404,
  Error500,
  Main,
} from "./pages";
import LoginController from "./controllers/LoginController";
import { Pages } from "./typings";

export function removeBodyLoader() {
  (document.querySelector('body') as HTMLElement).classList.remove(
    'loader',
  );
}

export function addBodyLoader() {
  (document.querySelector('body') as HTMLElement).classList.add(
    'loader',
  );
}

window.addEventListener("DOMContentLoaded", async () => {
  
  addBodyLoader();
  Router
  .use("/", Main)
  .use("/login", Login)
  .use("/signUp", SignUp)
  .use("/profile", ProfilePage)
  .use("/profileEdit", ProfilePage)
  .use("/profileChangePassword", ProfilePage)
  .use("/chat", Chat)
  .use("/404", Error404)
  .use("/500", Error500)
  // .start();

  
  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Pages.LOGIN:
    case Pages.SIGN_UP:
      isProtectedRoute = false;
      break;
  }

  try {
    await LoginController.fetchUser();
    Router.start();
    if (!isProtectedRoute) {
    // Router.go(window.location.pathname)
      Router.go("/profile")
    }
    removeBodyLoader();
  } catch (e) {
    // console.log('e', e)
    Router.start();
    if (isProtectedRoute) {
      Router.go("/login");
      // Router.go(Routes.SignIn);
    }
    removeBodyLoader();
  }
});
