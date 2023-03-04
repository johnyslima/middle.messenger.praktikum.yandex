export enum Pages {
  LOGIN = 'login',
  SIGN_UP = 'signUp',
  PROFILE = 'profile',
  PROFILE_EDIT = 'profileEdit',
  PROFILE_CHANGE_PASSWORD = 'profileChangePassword',
  CHAT = 'chat',
  ERROR_404 = 'error404',
  ERROR_500 = 'error500'
}

export type PageType = {
  currentPage?: string
}
