// import main from "./src/index.hbs";
import { Login } from "../pages/auth/login";
import { SignUp } from "../pages/auth/signUp";

const ROUTES = {
//   main: main,
  login: Login,
  signUp: SignUp,
  // chat: chat,
  // profile: profile,
  // profileEdit: profile,
  // profileChangePassword: profile,
  // error404: error,
  // error500: error,
};

export const render = (route: keyof typeof ROUTES) => {
  const app = document.querySelector('#root')!
  app.innerHTML = ''

  const PageComponent = ROUTES[route]
  const page = new PageComponent()

  if (page.element) {
    app.appendChild(page.element)
    page.dispatchComponentDidMount()
  }
}

