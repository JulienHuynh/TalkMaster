import * as React from 'react';
import {useEffect, useState} from "react";
import type {Talk} from "../../../types/Talk.ts";
import useGetTalkRequests from "../../../hooks/useGetTalkRequests.ts";
import TalkCard from "../../card/TalkCard.tsx";
import useUpdateStateTalk from '../../../hooks/useUpdateStateTalk.ts';

const TalkManagement: React.FC = () => {
    const [talkRequests, setTalkRequests] = useState<Talk[]>([]);
    const getTalks = useGetTalkRequests();

    const handleTalkState = (isValidate: boolean, talkID: number) => {
        useUpdateStateTalk(talkID, {status: isValidate ? "accepted" : "refused"}).then(() => {
            const updatedTalks = talkRequests.filter(talk => talk.id !== talkID);
            setTalkRequests(updatedTalks);
        }).catch((err) => {
            console.error('Erreur lors de la validation du talks', err);
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
                    <TalkCard talk={talk} toValidate={true} handleTalkState={handleTalkState}></TalkCard>
                ) : <div>Aucun talk demandé...</div>}
            </div>
        </div>
    );
};

export default TalkManagement;
