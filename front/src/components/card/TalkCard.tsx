import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import backgroundImage from "../../../public/conference.jpg";
import type { Talk } from "../../types/Talk.ts";
import IconButton from "@mui/material/IconButton";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";
import { TbCircleNumber4Filled } from "react-icons/tb";
import { TbCircleNumber5Filled } from "react-icons/tb";
import { Button } from "@mui/material";

interface TalkCardProps {
  talk: Talk;
  handleTalkState?: (isValidate: boolean, talkID: number) => void;
  toValidate: boolean;
}

const TalkCard: React.FC<TalkCardProps> = ({
  talk,
  ValidateTalk,
  DeclineTalk,
  toValidate = false,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  const convertDuration = (duration: number) => {
    const minutesDuration = duration * 15;
    const minutesLeft = minutesDuration % 60;
    const hourNumber = Math.floor(minutesDuration / 60);

    if (hourNumber > 0) {
      return hourNumber + "h" + minutesLeft;
    }

    return minutesDuration + "m";
  };

  return (
    <Card
      className="talk-card"
      sx={{
        position: "relative",
        minWidth: 275,
        width: "100%",
        borderRadius: 5,
        marginBottom: 3,
        overflow: "hidden",
      }}
      onClick={handleCardClick}
      key={talk.id}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)", // adjust brightness here (0 to 1)
          zIndex: 0,
        }}
      />
      <CardContent sx={{ position: "relative", zIndex: 1, color: "white" }}>
        <div className={"flex items-center justify-between"}>
          <div>
            <Typography variant="h5" component="div">
              {talk.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>{talk.subject}</Typography>
            <Typography variant="body2">
              12/02/2025
              <br />
              {convertDuration(talk.duration)}
            </Typography>
          </div>
        </div>

        {expanded && toValidate && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-row align-items-center justify-center">
              <div className="flex flex-row mr-5">
                Début :<p className="font-bold">{"start-time"}</p>
              </div>
              <div className="flex flex-row mr-5">
                Fin :<p className="font-bold">{"start time + duration"}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Salles disponibles</p>
              <div className="flex flex-wrap justify-center mt-2">
                {/* utilise les icon pour le map des 5 room */}
                <div className="flex flex-row gap-2">
                  <IconButton sx={{ padding: 0 }}>
                    <TbCircleNumber1Filled size="30" color="white" />
                  </IconButton>
                  <IconButton sx={{ padding: 0 }}>
                    <TbCircleNumber2Filled size="30" color="white" />
                  </IconButton>
                  <IconButton sx={{ padding: 0 }}>
                    <TbCircleNumber3Filled size="30" color="white" />
                  </IconButton>
                  <IconButton sx={{ padding: 0 }}>
                    <TbCircleNumber4Filled size="30" color="white" />
                  </IconButton>
                  <IconButton sx={{ padding: 0 }}>
                    <TbCircleNumber5Filled size="30" color="white" />
                  </IconButton>
                </div>
              </div>
            </div>

            <div
              className={"flex gap-2 w-full justify-center"}
              onClick={(e) => e.stopPropagation()}
            >
              {ValidateTalk && (
                <Button
                  className={
                    "bg-white rounded-full p-1 mr-5 cursor-pointer validated w-1/3"
                  }
                  onClick={() => ValidateTalk(talk.id)}
                >
                  Valider
                </Button>
              )}
              {DeclineTalk && (
                <Button
                  className={
                    "bg-white rounded-full p-1 cursor-pointer declined w-1/3"
                  }
                  onClick={() => DeclineTalk(talk.id)}
                >
                  Refuser
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TalkCard;
