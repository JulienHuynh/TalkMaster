import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import useUpdateStateTalk from "../../hooks/useUpdateStateTalk.ts";
import type { Talk } from "../../types/Talk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Management: React.FC = () => {
  const [talkRequests, setTalkRequests] = useState<Talk[]>([]);

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
          return Promise.reject(
            "Erreur lors du chargement des demandes de talk",
          );
        }
        return response.json();
      })
      .then((data) => {
        setTalkRequests(data);
      });
  }, [token]);

  useEffect(() => {
    fetchTalkRequests();
  }, [fetchTalkRequests]);

  const updateTalkState = useUpdateStateTalk;

  const handleTalkState = (isValidate: boolean, talkID: number) => {
    updateTalkState(talkID, {
      status: isValidate ? "accepted" : "refused",
    }).then(() => {
      const updatedTalks = talkRequests.filter((talk) => talk.id !== talkID);
      setTalkRequests(updatedTalks);
    });
  };

  return (
    <div>
      <div className={"flex flex-col items-center"}>
        <h4 className="font-bold mb-10">Demandes de talks</h4>
        {talkRequests.length > 0 ? (
          talkRequests.map((talk) => (
            <TalkCard
              key={talk.id}
              talk={talk}
              toValidate={true}
              handleTalkState={handleTalkState}
            />
          ))
        ) : (
          <div>Aucun talk demandé...</div>
        )}
      </div>
    </div>
  );
};

export default Management;
