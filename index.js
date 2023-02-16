import main from "./src/index.hbs";
import data from "./src/data/data.yaml";
import login from "./src/pages/auth/login.hbs";
import signIn from "./src/pages/auth/signin.hbs";
import chat from "./src/pages/chat/chat.hbs";
import profile from "./src/pages/profile/profile.hbs";
import error from "./src/pages/error/errorPage.hbs";
import avatar from "./src/assets/images/avatar.png";
import addIconSvg from "./src/assets/icons/add_icon.svg";
import arrowRightIconSvg from "./src/assets/icons/arrow_right.svg";
import arrowLeftIconSvg from "./src/assets/icons/arrow_left.svg";
import emptyPictIconSvg from "./src/assets/icons/empty_pict.svg";
import contextMenuIconSvg from "./src/assets/icons/context_menu.svg";
import "./src/style/index.pcss";
import "./src/components";
import "./src/layouts";
import "./src/helpers/ifEqual";

const ROUTES = {
  main: main,
  login: login,
  signIn: signIn,
  chat: chat,
  profile: profile,
  profileEdit: profile,
  profileChangePassword: profile,
  error404: error,
  error500: error,
};

const icons = {
  addIconSvg,
  arrowRightIconSvg,
  arrowLeftIconSvg,
  contextMenuIconSvg,
  emptyPictIconSvg,
};

function render(html) {
  const app = document.querySelector("#root");
  app.innerHTML = html;
}

window.goToPage = (name) => {
  console.log("here", name, { ...data, icons: { addIconSvg }, page: name });
  const page = ROUTES[name];
  render(page({ ...data, icons, page: name }));
};

window.addEventListener("DOMContentLoaded", () => {
  const html = main(data);

  // render(html);
  render(ROUTES.main(data));
});
