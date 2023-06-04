export interface NewUser {
  username: string;
  email: string;
  /** @format password */
  password: string;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface UpdateUser {
  email?: string;
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}