import type { Dayjs } from "dayjs";

export interface TalkProps {
  title: string;
  subject: string;
  description: string;
  date: Dayjs | null;
}
