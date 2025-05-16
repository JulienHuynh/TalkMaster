import { useSnackbar } from "notistack";
import type * as React from "react";
import { useCallback, useEffect, useState } from "react";
import type { Talk } from "../../types/Talk.ts";
import TalkCard from "../card/TalkCard.tsx";

const Overview: React.FC = () => {
  const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  // useEffect(() => {
  //   const fetchTalks = async () => {
  //     try {
  //       //call API qui retourne des dates en UTC
  //       const now = new Date();

  //       // calcul du startTime basée sur la date actuelle
  //       const calculateStartTime = (
  //         dayOffset: number,
  //         hour: number,
  //         minute: number,
  //       ): Date => {
  //         return new Date(
  //           Date.UTC(
  //             now.getFullYear(),
  //             now.getMonth(),
  //             now.getDate() + dayOffset,
  //             hour,
  //             minute,
  //             0,
  //           ),
  //         );
  //       };

  //       const fakeTalk: Talk = {
  //         id: 1,
  //         title: "Conférence Test",
  //         description: "Une conférence fictive pour test",
  //         duration: 2,
  //         subject: "Développement",
  //         status: "pending",
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         roomId: 1,
  //         userId: "abc-123",
  //         room: {
  //           id: 1,
  //           name: "Salle A",
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //           Talk: [],
  //           Slot: [],
  //         },
  //         user: {
  //           id: "abc-123",
  //           email: "test@example.com",
  //           password: null,
  //           createdAt: new Date(),
  //           updatedAt: new Date(),
  //           role: "public",
  //           firstName: "John",
  //           lastName: "Doe",
  //           Talk: [],
  //           Favorite: [],
  //           Slot: [],
  //         },
  //         Favorite: [],
  //         Slot: [],
  //       };

  //       const talks = [
  //         {
  //           ...fakeTalk,
  //           id: 1,
  //           title: "Conférence Test",
  //           duration: 2,
  //           startTime: calculateStartTime(1, 14, 0),
  //         },
  //         {
  //           ...fakeTalk,
  //           id: 2,
  //           title: "Développement Web",
  //           duration: 1,
  //           startTime: calculateStartTime(2, 10, 0),
  //         },
  //         {
  //           ...fakeTalk,
  //           id: 3,
  //           title: "Intelligence Artificielle",
  //           duration: 3,
  //           startTime: calculateStartTime(3, 16, 30),
  //         },
  //         {
  //           ...fakeTalk,
  //           id: 4,
  //           title: "DevOps en pratique",
  //           duration: 2,
  //           startTime: calculateStartTime(4, 9, 0),
  //         },
  //         {
  //           ...fakeTalk,
  //           id: 5,
  //           title: "Blockchain Avancée",
  //           duration: 1,
  //           startTime: calculateStartTime(5, 13, 15),
  //         },
  //         {
  //           ...fakeTalk,
  //           id: 6,
  //           title: "UX Design",
  //           duration: 3,
  //           startTime: calculateStartTime(1, 11, 45),
  //         },
  //       ];

  //       setTalkRequests(talks);
  //     } catch (error) {
  //       return error;
  //     }
  //   };

  //   fetchTalks();
  // }, []);

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
