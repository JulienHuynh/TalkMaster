import type { Talk } from "../types/Talk";
import { useApi } from "./useApi";

export default function useGetTalkRequests() {
  return () =>
    fetch(`${import.meta.env.VITE_API_HOST}/talks/pending-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((data) => data.json());
}

export const useGetTalks = () => {
  const options = {
    method: "GET",
    url: `${import.meta.env.VITE_API_HOST}/talks/`,
  };

  const { data, isLoading, error } = useApi<Talk>(options, ["talks"]);

  //   console.log(data);

  return { talkData: data, isLoading, error };
};
