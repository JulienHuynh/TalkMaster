import type { Talk } from "./Talk.ts";
import type { User } from "./User.ts";

export type Favorite = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  talkId: number;
  user?: User;
  talk?: Talk;
};
