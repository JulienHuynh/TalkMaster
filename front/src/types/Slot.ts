import type {Room} from "./Room.ts";
import type {User} from "./User.ts";

export type Slot = {
    id: number;
    date: Date;
    roomId: number;
    userId: string;
    createdAt: Date;
    room?: Room;
    reservedBy?: User;
};
