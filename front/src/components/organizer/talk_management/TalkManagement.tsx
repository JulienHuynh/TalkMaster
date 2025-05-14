import * as React from 'react';
import {useEffect, useState} from "react";
import type {Talk} from "../../../types/Talk.ts";
import useGetTalkRequests from "../../../hooks/useGetTalkRequests.ts";
import useValidateTalk from "../../../hooks/useValidateTalk.ts";
import useDeclineTalk from "../../../hooks/useDeclineTalk.ts";
import TalkCard from "../../card/TalkCard.tsx";

const TalkManagement: React.FC = () => {
    const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
    const getTalks = useGetTalkRequests();

    const ValidateTalk = (talkID: number) => {
        useValidateTalk(talkID).then(() => {
            const updatedTalks = talkRequests.filter(talk => talk.id !== talkID);
            setTalkRequests(updatedTalks);
        }).catch((err) => {
            console.error('Erreur lors de la validation du talks', err);
        });
    }

    const DeclineTalk = (talkID: number) => {
        useDeclineTalk(talkID).then(() => {
            const updatedTalks = talkRequests.filter(talk => talk.id !== talkID);
            setTalkRequests(updatedTalks);
        }).catch((err) => {
            console.error('Erreur lors du refus du talks', err);
        });
    }

    const getTalkRequests = () => {
        getTalks()
            .then((data) => {
                setTalkRequests(data);
            })
            .catch((err) => {
                console.error('Erreur de récupération des talks', err);
            });
    }

    useEffect(() => {
        getTalkRequests();
    }, []);

    return (
        <div>
            <div className={"flex-col items-center"}>
                <h1 className="text-3xl font-bold underline text-center mb-5">Demandes de talks</h1>
                { talkRequests.length > 0 ? talkRequests.map((talk) =>
                    <TalkCard talk={talk} toValidate={true} DeclineTalk={DeclineTalk} ValidateTalk={ValidateTalk}></TalkCard>
                ) : <div>Aucun talk demandé...</div>}
            </div>
        </div>
    );
};

export default TalkManagement;
