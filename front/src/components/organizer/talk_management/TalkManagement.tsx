import type * as React from "react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import useGetTalkRequests from "../../../hooks/useGetTalkRequests.ts";
import useUpdateStateTalk from "../../../hooks/useUpdateStateTalk.ts";
import type { Talk } from "../../../types/Talk.ts";
import TalkCard from "../../card/TalkCard.tsx";

const TalkManagement: React.FC = () => {
  const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
  const getTalks = useGetTalkRequests();

  const updateTalkState = useUpdateStateTalk;

  const handleTalkState = (isValidate: boolean, talkID: number) => {
    updateTalkState(talkID, {
      status: isValidate ? "accepted" : "refused",
    }).then(() => {
      const updatedTalks = talkRequests.filter((talk) => talk.id !== talkID);
      setTalkRequests(updatedTalks);
    });
  };

  const getTalkRequests = useCallback(() => {
    getTalks()
      .then((data) => {
        setTalkRequests(data);
      })
      .catch(() => {});
  }, [getTalks]);

  useEffect(() => {
    getTalkRequests();
  }, [getTalkRequests]);

  return (
    <div>
      <div className={"flex-col items-center"}>
        <h1 className="text-3xl font-bold underline text-center mb-5">
          Demandes de talks
        </h1>
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

export default TalkManagement;
