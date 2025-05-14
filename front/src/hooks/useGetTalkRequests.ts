import { useApi } from "./use-api";
import type { Talk } from "../types/Talk";

export default function useGetTalkRequests() {
  return function () {
    return fetch(`${import.meta.env.VITE_API_HOST}/talks/pending-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
  };
}

export const useGetTalk = (id: number) => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_API_HOST}/talks/${id}`,
  };

  const { data, isLoading, error } = useApi<Talk>(options, ["talk", id], {
    enabled: !!id,
  });

  return { talkData: data, isLoading, error };
};
