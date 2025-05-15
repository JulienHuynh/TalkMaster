import type { CreateTalkProps } from "../types/Talk";

export default function useCreateTalk() {
  const createTalk = (talk: CreateTalkProps) => {
    const newTalk = {
      ...talk,
      userId: "e69e1032-a5fd-43fb-9382-b90350d224ca",
      roomId: 1,
      status: "pending",
      date: new Date(),
    };

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return fetch(`${import.meta.env.VITE_API_HOST}/talks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTalk),
    }).then((data) => data.json());
  };

  return { createTalk };
}
