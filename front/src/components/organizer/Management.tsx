import * as React from "react";
import { useEffect, useState } from "react";
import type { Talk } from "../../types/Talk.ts";
import useGetTalkRequests from "../../hooks/useGetTalkRequests.ts";
import useValidateTalk from "../../hooks/useValidateTalk.ts";
import useDeclineTalk from "../../hooks/useDeclineTalk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Management: React.FC = () => {
  const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
  const getTalks = useGetTalkRequests();

  const ValidateTalk = (talkID: number) => {
    useValidateTalk(talkID)
      .then(() => {
        const updatedTalks = talkRequests.filter((talk) => talk.id !== talkID);
        setTalkRequests(updatedTalks);
      })
      .catch((err) => {
        console.error("Erreur lors de la validation du talks", err);
      });
  };

  const DeclineTalk = (talkID: number) => {
    useDeclineTalk(talkID)
      .then(() => {
        const updatedTalks = talkRequests.filter((talk) => talk.id !== talkID);
        setTalkRequests(updatedTalks);
      })
      .catch((err) => {
        console.error("Erreur lors du refus du talks", err);
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
      date: new Date(),
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
              talk={talk}
              toValidate={true}
              declineTalk={DeclineTalk}
              validateTalk={ValidateTalk}
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
