import type { Slot } from "./Slot.ts";
import type { Talk } from "./Talk.ts";

export type Room = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  Talk?: Talk[];
  Slot?: Slot[];
};
