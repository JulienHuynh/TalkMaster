import { useSnackbar } from "notistack";
import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { Talk } from "../../types/Talk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Overview: React.FC = () => {
  const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  const fetchTalkRequests = useCallback(() => {
    if (!token) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_HOST}/talks/pending-requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          enqueueSnackbar("Erreur lors du chargement des demandes de talk", {
            variant: "error",
          });
          return Promise.reject(
            "Erreur lors du chargement des demandes de talk",
          );
        }
        return response.json();
      })
      .then((data) => {
        setTalkRequests(data);
      });
  }, [token, enqueueSnackbar]);

  useEffect(() => {
    fetchTalkRequests();
  }, [fetchTalkRequests]);

  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <h4 className="font-bold mb-10">Créneaux des talks</h4>
        {talkRequests.length > 0 ? (
          talkRequests.map((talk) => (
            <TalkCard key={talk.id} talk={talk} toValidate={false} />
          ))
        ) : (
          <div>Aucun talk planifié...</div>
        )}
      </div>
    </div>
  );
};

export default Overview;
