import type { Profile } from "./user";

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export interface NewComment {
  body: string;
}