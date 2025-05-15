import type * as React from "react";
import { useEffect, useState } from "react";
import useGetTalkRequests from "../../hooks/useGetTalkRequests.ts";
import useUpdateStateTalk from "../../hooks/useUpdateStateTalk.ts";
import type { Talk } from "../../types/Talk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Management: React.FC = () => {
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

  const getTalkRequests = () => {
    getTalks()
      .then((data) => {
        setTalkRequests(data);
      })
      .catch((err) => {
        console.error("Erreur de récupération des talks", err);
      });
  };

  useEffect(() => {
    const fakeTalk: Talk = {
      id: 1,
      title: "Conférence Test",
      description: "Une conférence fictive pour test",
      duration: 30,
      subject: "Développement",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      roomId: 1,
      userId: "abc-123",
      room: {
        id: 1,
        name: "Salle A",
        createdAt: new Date(),
        updatedAt: new Date(),
        Talk: [],
        Slot: [],
      },
      user: {
        id: "abc-123",
        email: "test@example.com",
        password: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "public",
        firstName: "John",
        lastName: "Doe",
        Talk: [],
        Favorite: [],
        Slot: [],
      },
      Favorite: [],
      Slot: [],
    };
    setTalkRequests([
      {
        ...fakeTalk,
        id: 1,
        title: "Conférence Test",
        duration: 2,
        date: new Date(),
      },
      {
        ...fakeTalk,
        id: 2,
        title: "Développement Web",
        duration: 1,
        date: new Date(),
      },
      {
        ...fakeTalk,
        id: 3,
        title: "Intelligence Artificielle",
        duration: 3,
        date: new Date(),
      },
      {
        ...fakeTalk,
        id: 4,
        title: "DevOps en pratique",
        duration: 2,
        date: new Date(),
      },
      {
        ...fakeTalk,
        id: 5,
        title: "Blockchain Avancée",
        duration: 1,
        date: new Date(),
      },
      {
        ...fakeTalk,
        id: 6,
        title: "UX Design",
        duration: 3,
        date: new Date(),
      },
    ]);
    getTalkRequests();
  }, []);

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
            ></TalkCard>
          ))
        ) : (
          <div>Aucun talk demandé...</div>
        )}
      </div>
    </div>
  );
};

export default Management;
