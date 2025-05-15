import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import type { Talk } from "../../types/Talk.ts";

interface TalkCardProps {
    talk: Talk;
    handleTalkState?: (isValidate: boolean, talkID: number) => void;
    toValidate: boolean;
}

const TalkCard: React.FC<TalkCardProps> = ({ talk, handleTalkState, toValidate = false }) => {

    const convertDuration = (duration: number) => {
        const minutesDuration = duration * 15;
        const minutesLeft = minutesDuration % 60;
        const hourNumber = Math.floor(minutesDuration / 60);

        if (hourNumber > 0) {
            return hourNumber + "h" + minutesLeft;
        }

        return minutesDuration + "m";
    }

    return (
        <Card sx={{
            minWidth: 275,
            marginBottom: 3,
            backgroundImage: `url("conference.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
        }} key={talk.id}>
            <CardContent>
                <div className={"flex items-center justify-between"}>
                    <div>
                        <Typography variant="h5" component="div">
                            {talk.title}
                        </Typography>
                        <Typography sx={{mb: 1.5}}>{talk.subject}</Typography>
                        <Typography variant="body2">
                            12/02/2025
                            <br/>
                            {convertDuration(talk.duration)}
                        </Typography>
                    </div>
                    {toValidate && (
                        <div className={"flex"}>
                            {handleTalkState && (
                                <>
                                    <div className={"bg-white rounded-full p-1 mr-5 cursor-pointer"} onClick={() => handleTalkState(true, talk.id)}>
                                        <IoMdCheckmark size={24} className={"text-green-500"} />
                                    </div>
                                    <div className={"bg-white rounded-full p-1 cursor-pointer"} onClick={() => handleTalkState(false, talk.id)}>
                                        <RxCross2 size={24} className={"text-red-500"} />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TalkCard;
