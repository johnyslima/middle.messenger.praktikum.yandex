import "./style/index.pcss";
import "./components";
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
      // Router.go(window.location.pathname)
      // Router.go("/profile");
      Router.go(CHAT_PAGE)
    }
    removeBodyLoader();
  } catch (e) {
    // console.log('e', e)
    Router.start();
    if (isProtectedRoute) {
      // Router.go("/login");
      Router.go(LOGIN_PAGE);
      // Router.go(Routes.SignIn);
    }
    removeBodyLoader();
  }
});
