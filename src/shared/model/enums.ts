export const enum AppRoutes {
  HOME = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
  NOT_FOUND = '*',
}

export const enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export const enum FetchStatus {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export const enum NameSpace {
  OFFER = 'OFFER',
  USER = 'USER',
  CITY = 'CITY',
  REVIEW = 'REVIEW',
  SNACKBAR = 'SNACKBAR',
}
