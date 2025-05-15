import type { Talk } from "../types/Talk";

export const defaultTalk: Talk = {
  id: 0,
  title: "",
  subject: "",
  status: "",
  duration: 0,
  description: "",
  date: new Date(),
  roomId: 0,
  userId: "",
};
