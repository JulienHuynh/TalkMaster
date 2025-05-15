import * as React from "react";
import { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import backgroundImage from "../../../public/conference.jpg";
import type { Talk } from "../../types/Talk";
import type { Slot } from "../../types/Slot";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Button, Badge, Chip, Collapse } from "@mui/material";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
} from "react-icons/tb";
import {
  MdOutlineAccessTime,
  MdOutlineCalendarToday,
  MdOutlineExpandMore,
  MdLocationOn,
  MdPerson,
} from "react-icons/md";

interface TalkCardProps {
  talk: Talk;
  handleTalkState?: (isValidate: boolean, talkID: number) => void;
  toValidate: boolean;
  availableSlots?: Slot[];
}

const TalkCard: React.FC<TalkCardProps> = ({
  talk,
  handleTalkState,
  toValidate = false,
  availableSlots = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle card expansion
  const handleCardClick = () => {
    setExpanded((prev) => !prev);
  };

  // Handle room selection
  const handleSlotSelection = (e: React.MouseEvent, slotId: number) => {
    e.stopPropagation();
    setSelectedSlot(selectedSlot === slotId ? null : slotId);
  };

  // Handle talk validation
  const handleValidate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (handleTalkState && selectedSlot) {
      handleTalkState(true, talk.id);
    }
  };

  // Handle talk rejection
  const handleDecline = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (handleTalkState) {
      handleTalkState(false, talk.id);
    }
  };

  // Format minutes to readable duration
  const convertDuration = (duration: number) => {
    switch (duration) {
      case 1:
        return "15m";
      case 2:
        return "30m";
      case 3:
        return "45m";
      default:
        return "Durée non spécifiée";
    }
  };

  // Format date to locale string
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // Format time to HH:MM
  const formatTime = (date: Date) => {
    return format(date, "HH'h'mm", { locale: fr });
  };

  // Calculate end time based on start time and duration
  const getEndTime = (date: Date, duration: number) => {
    const endTime = new Date(date);
    endTime.setMinutes(endTime.getMinutes() + duration * 15);
    return formatTime(endTime);
  };

  // Get selected room name
  const getSelectedRoomName = () => {
    if (selectedSlot === null) return "";
    const selectedSlotObj = availableSlots.find(
      (slot) => slot.id === selectedSlot
    );
    return selectedSlotObj?.room?.name || "";
  };

  // Room icons
  const roomIcons = [
    <TbCircleNumber1Filled key="room1" size="30" />,
    <TbCircleNumber2Filled key="room2" size="30" />,
    <TbCircleNumber3Filled key="room3" size="30" />,
    <TbCircleNumber4Filled key="room4" size="30" />,
    <TbCircleNumber5Filled key="room5" size="30" />,
  ];

  return (
    <Card
      className="talk-card"
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 3,
        marginBottom: 3,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        },
      }}
      onClick={handleCardClick}
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
          filter: "brightness(0.5)",
          zIndex: 0,
        }}
      />

      <CardContent
        sx={{ position: "relative", zIndex: 1, color: "white", padding: 3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              {talk.title}
            </Typography>

            <div className="flex flex-wrap gap-2 mb-2">
              <Chip
                size="small"
                label={talk.subject}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                size="small"
                icon={<MdOutlineAccessTime color="white" />}
                label={convertDuration(talk.duration)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />
            </div>

            <div className="flex items-center mb-1">
              <MdPerson className="mr-1" />
              <Typography variant="body2">
                {talk.user?.firstName} {talk.user?.lastName}
              </Typography>
            </div>

            <div className="flex items-center">
              <MdOutlineCalendarToday className="mr-1" />
              <Typography variant="body2">
                {talk.date
                  ? `${formatDate(talk.date)} à ${formatTime(talk.date)}`
                  : "Date non disponible"}
              </Typography>
            </div>
          </div>

          <IconButton
            sx={{
              color: "white",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
            onClick={handleCardClick}
          >
            <MdOutlineExpandMore />
          </IconButton>
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="flex flex-col gap-4 mt-4" ref={contentRef}>
            {talk.description && (
              <div className="mt-2 p-3 bg-black bg-opacity-30 rounded-lg">
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Description:
                </Typography>
                <Typography variant="body2">{talk.description}</Typography>
              </div>
            )}

            <div className="flex flex-row items-center justify-center gap-6 bg-black bg-opacity-20 p-2 rounded-lg">
              <div className="flex flex-col items-center">
                <Typography variant="caption">Début</Typography>
                <Typography variant="body1" className="font-bold">
                  {talk.date ? formatTime(talk.date) : "Heure non disponible"}
                </Typography>
              </div>

              <div className="flex flex-col items-center">
                <Typography variant="caption">Durée</Typography>
                <Typography variant="body1" className="font-bold">
                  {convertDuration(talk.duration)}
                </Typography>
              </div>

              <div className="flex flex-col items-center">
                <Typography variant="caption">Fin</Typography>
                <Typography variant="body1" className="font-bold">
                  {talk.date
                    ? getEndTime(talk.date, talk.duration)
                    : "Heure de fin non disponible"}
                </Typography>
              </div>
            </div>

            {toValidate && (
              <>
                <div className="flex flex-col justify-center items-center mt-2">
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Sélectionner une salle
                  </Typography>

                  {availableSlots.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-3">
                      {availableSlots.map((slot, index) => (
                        <Tooltip key={slot.id} title={`Salle ${slot.roomId}`}>
                          <Badge
                            color="primary"
                            variant={
                              selectedSlot === slot.id ? "standard" : "dot"
                            }
                            overlap="circular"
                            badgeContent=" "
                          >
                            <IconButton
                              sx={{
                                padding: 1,
                                backgroundColor:
                                  selectedSlot === slot.id
                                    ? "rgba(255, 255, 255, 0.3)"
                                    : "rgba(255, 255, 255, 0.1)",
                                color: "white",
                                borderRadius: "50%",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                                },
                              }}
                              onClick={(e) => handleSlotSelection(e, slot.id)}
                            >
                              {roomIcons[index % roomIcons.length]}
                            </IconButton>
                          </Badge>
                        </Tooltip>
                      ))}
                    </div>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: "orange", mt: 1, fontWeight: "bold" }}
                    >
                      Aucune salle disponible pour ce créneau
                    </Typography>
                  )}

                  {selectedSlot !== null && (
                    <Chip
                      icon={<MdLocationOn />}
                      label={`Salle sélectionnée: ${getSelectedRoomName()}`}
                      sx={{
                        mt: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                      }}
                    />
                  )}
                </div>

                <div
                  className="flex gap-4 w-full justify-center mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  {handleTalkState && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: "50px",
                          backgroundColor: "rgba(46, 125, 50, 0.9)",
                          "&:hover": {
                            backgroundColor: "rgba(46, 125, 50, 1)",
                          },
                          width: "40%",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => handleValidate(e)}
                        disabled={
                          availableSlots.length > 0 && selectedSlot === null
                        }
                      >
                        Valider le talk
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          borderRadius: "50px",
                          backgroundColor: "rgba(211, 47, 47, 0.9)",
                          "&:hover": {
                            backgroundColor: "rgba(211, 47, 47, 1)",
                          },
                          width: "40%",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => handleDecline(e)}
                      >
                        Refuser
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default TalkCard;
