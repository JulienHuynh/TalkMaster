import type { Favorite } from "./Favorite.ts";
import type { Slot } from "./Slot.ts";
import type { Talk } from "./Talk.ts";

export type User = {
  id: string;
  email?: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  firstName?: string | null;
  lastName?: string | null;
  token?: string | null;
  Talk?: Talk[];
  Favorite?: Favorite[];
  Slot?: Slot[];
};
