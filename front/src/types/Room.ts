import type {Talk} from "./Talk.ts";
import type {Slot} from "./Slot.ts";

export type Room = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    Talk?: Talk[];
    Slot?: Slot[];
};
