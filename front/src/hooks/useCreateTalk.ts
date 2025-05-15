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
      credentials: "include",
      body: JSON.stringify(newTalk),
    }).then((data) => data.json());
  };

  return { createTalk };
}


// export const useGetTalk = (id: number) => {
//   const options = {
//     method: "GET",
//     url: `${import.meta.env.VITE_API_HOST}/talks/${id}`,
//   };

//   const { data, isLoading, error } = useApi<Talk>(options, ["talk", id], {
//     enabled: !!id,
//   });

//   return { talkData: data, isLoading, error };
// };