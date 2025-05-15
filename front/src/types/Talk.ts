import type { Favorite } from "./Favorite.ts";
import type { Room } from "./Room.ts";
import type { Slot } from "./Slot.ts";
import type { User } from "./User.ts";

export type Talk = {
  id: number;
  title: string;
  description?: string | null;
  date?: Date;
  duration: number;
  subject: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  roomId: number;
  userId: string;
  room?: Room;
  user?: User;
  Favorite?: Favorite[];
  Slot?: Slot[];
};
