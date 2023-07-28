// import { Login, SignUp, Profile, Chat, Error404, Error500, Main } from "../pages";

// const ROUTES = {
//   main: Main,
//   login: Login,
//   signUp: SignUp,
//   chat: Chat,
//   profile: Profile,
//   profileEdit: Profile,
//   profileChangePassword: Profile,
//   error404: Error404,
//   error500: Error500
// };

// export const renderDom = (route: keyof typeof ROUTES) => {
//   console.log('route', route)
//   const app = document.querySelector("#root")!;
//   app.innerHTML = "";

//   const PageComponent = ROUTES[route];
//   const data = { currentPage: route };
//   const page = new PageComponent(data);

//   if (page.element) {
//     app.appendChild(page.element);
//     page.dispatchComponentDidMount();
//   }
// };
