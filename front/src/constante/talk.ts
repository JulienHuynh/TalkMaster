import type { Talk } from "../types/Talk";

export const defaultTalk: Talk = {
  id: 0,
  title: "",
  subject: "",
  status: "",
  description: "",
  date: new Date(),
  roomId: 0,
  userId: "",
};
