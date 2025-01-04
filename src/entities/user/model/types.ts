export type UserData = {
  isLoggedIn: boolean;
  email?: string;
  avatarUrl?: string;
};

export type UserDataContext = {
  user: UserData;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};
