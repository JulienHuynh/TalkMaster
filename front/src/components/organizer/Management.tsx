import { useSnackbar } from "notistack";
import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import useUpdateStateTalk from "../../hooks/useUpdateStateTalk.ts";
import type { Talk } from "../../types/Talk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Management: React.FC = () => {
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

  // Define a payload interface for updating talk state
  interface TalkStatePayload {
    talkId: number;
    roomId: number;
    slotsIndex: object[];
  }

  // Define the signature of the updateTalkState function
  type UpdateTalkStateFn = (payload: TalkStatePayload) => Promise<Response>;

  // Annotate the hook with its return type
  const updateTalkState: UpdateTalkStateFn = useUpdateStateTalk;

  const handleTalkState = (
    talkId: number,
    roomId: number,
    slotsIndex: object[],
  ): void => {
    updateTalkState({
      talkId,
      roomId,
      slotsIndex,
    })
      .then(() => {
        const updatedTalks = talkRequests.filter((talk) => talk.id !== talkId);
        setTalkRequests(updatedTalks);
        enqueueSnackbar("Talk validé avec succès", {
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        enqueueSnackbar(`${error}`, {
          variant: "error",
        });
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
