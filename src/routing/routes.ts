import {
  Login,
  SignUp,
  ProfilePage,
  Chat,
  Error404,
  Error500,
} from "../pages";

export type TRoutes = {
    [key: string]: any
};

export const LOGIN_PAGE = '/';
export const REGISTRATION_PAGE = '/sign-up';
export const CHAT_PAGE = '/messenger';
export const PROFILE_PAGE = '/settings';
export const PROFILE_EDIT_PAGE = '/settings/edit';
export const PROFILE_CHANGE_PASSWORD_PAGE = '/settings/change-password';
export const ERROR_PAGE_404 = '/error/404'; 
export const ERROR_PAGE_500 = '/error/500'; 

export const Routers: TRoutes = {
    [LOGIN_PAGE]: Login,
    [REGISTRATION_PAGE]: SignUp,
    [CHAT_PAGE]: Chat,  
    [PROFILE_PAGE]: ProfilePage,
    [PROFILE_EDIT_PAGE]: ProfilePage,
    [PROFILE_CHANGE_PASSWORD_PAGE]: ProfilePage,
    [ERROR_PAGE_404]: Error404, 
    [ERROR_PAGE_500]: Error500, 
};
