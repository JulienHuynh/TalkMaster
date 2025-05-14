import type { CreateTalkProps } from "../types/Talk";

export default function useCreateTalk() {
  const createTalk = (talk: CreateTalkProps) => {
    const newTalk = {
      ...talk,
      userId: "1",
      roomId: 1,
    };
    // console.log(newTalk);
    return fetch(`${import.meta.env.VITE_API_HOST}/talks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTalk),
    }).then((data) => data.json());
  };

  return { createTalk };
}
