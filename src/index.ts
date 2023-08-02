import "./components";
import './style';
import 'icon-blender/css/icon-blender.css';
import Router, { BlockConstructable } from "./routing/router";
import LoginController from "./controllers/LoginController";
import { CHAT_PAGE, LOGIN_PAGE, REGISTRATION_PAGE, Routers } from "./routing/routes";

export function removeBodyLoader() {
  (document.querySelector("body") as HTMLElement).classList.remove("loader");
}

export function addBodyLoader() {
  (document.querySelector("body") as HTMLElement).classList.add("loader");
}

window.addEventListener("DOMContentLoaded", async () => {
  addBodyLoader();

  Object.keys(Routers).map((item) =>
    Router.use(item, Routers[item] as keyof BlockConstructable)
  );

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case LOGIN_PAGE:
    case REGISTRATION_PAGE:
        isProtectedRoute = false;
        break;
  }

  try {
    await LoginController.fetchUser();
    Router.start();
    if (!isProtectedRoute) {
      Router.go(CHAT_PAGE)
    }
    removeBodyLoader();
  } catch (e) {
    Router.start();
    if (isProtectedRoute) {
      Router.go(LOGIN_PAGE);
    }
    removeBodyLoader();
  }
});
