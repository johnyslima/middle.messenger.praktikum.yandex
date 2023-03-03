import { Login, SignUp, Profile, Chat, Error404, Error500 } from "../pages";

const ROUTES = {
  login: Login,
  signUp: SignUp,
  chat: Chat,
  profile: Profile,
  profileEdit: Profile,
  profileChangePassword: Profile,
  error404: Error404,
  error500: Error500
};

export const renderDom = (route: keyof typeof ROUTES) => {
  const app = document.querySelector("#root")!;
  app.innerHTML = "";

  const PageComponent = ROUTES[route];
  const data = { currentPage: route };
  const page = new PageComponent(data);

  if (page.element) {
    app.appendChild(page.element);
    page.dispatchComponentDidMount();
  }
};
